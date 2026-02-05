import os
import threading
import asyncio
import json
from flask import Flask, jsonify, send_from_directory, abort
from flask_cors import CORS
import time

from server.discord_online import fetch_online_members

STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")

app = Flask(__name__, static_folder=STATIC_DIR, static_url_path="")
CORS(app)

members_data = []
lock = threading.Lock()

def run_discord_refresh():
    global members_data
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        result = loop.run_until_complete(fetch_online_members())
        loop.close()

        raw_members = result.get("members", [])
        with lock:
            members_data = raw_members
    except Exception as e:
        print("discord refresh error:", e)

# ---------- API ROUTES ----------
def safe_refresh():
    global refresh_running
    if refresh_running:
        return
    refresh_running = True
    try:
        run_discord_refresh()
    finally:
        refresh_running = False

@app.post("/api/run_discord_bot")
def run_discord_bot():
    t = threading.Thread(target=run_discord_refresh, daemon=True)
    t.start()
    return jsonify({"status": "started"}), 200

@app.get("/api/get_members")
def get_members():
    global members_data

    with lock:
        data = members_data

    if not data:
        threading.Thread(target=safe_refresh, daemon=True).start()
        return jsonify({"status": "loading"}), 202

    return jsonify({"members": data}), 200

# ---------- FRONTEND (SPA) ----------
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_site(path):
    # Don't let the SPA handler swallow API routes
    if path.startswith("api/"):
        return jsonify({"error": "Not found"}), 404

    file_path = os.path.join(STATIC_DIR, path)
    if path and os.path.exists(file_path):
        return send_from_directory(STATIC_DIR, path)
    return send_from_directory(STATIC_DIR, "index.html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)