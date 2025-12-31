import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("DISCORD_BOT_TOKEN")
GUILD_ID = int(os.getenv("GUILD_ID", "0"))

async def fetch_online_members():
    if not TOKEN:
        raise RuntimeError("DISCORD_BOT_TOKEN missing")
    if not GUILD_ID:
        raise RuntimeError("GUILD_ID missing")

    intents = discord.Intents.default()
    intents.members = True
    intents.presences = True
    intents.message_content = False 

    bot = commands.Bot(command_prefix="!", intents=intents)
    result = {"members": []}

    @bot.event
    async def on_ready():
        guild = bot.get_guild(GUILD_ID)
        if guild is None:
            print("Guild not found. Check GUILD_ID and that the bot is in the server.")
            await bot.close()
            return

        members = []
        for member in guild.members:
                if member.desktop_status != discord.Status.offline:
                    status = member.desktop_status.name
                elif member.mobile_status != discord.Status.offline:
                    status = member.mobile_status.name
                else:
                    status = member.web_status.name

                members.append({
                    "id": int(member.id),
                    "name": (member.nick or member.name or ""),
                    "status": str(status),
                    "avatar": (member.avatar.url if member.avatar else None),
                })
        result["members"] = members

        await bot.close()

    await bot.start(TOKEN)
    return result

