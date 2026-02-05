import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Header from "./components/header";
import Carousel from "./components/carousel";
import Home from "./components/home/home";
import Schedule from "./components/schedule/schedule";
import Structure from "./components/structure/structure";
import Gallery from "./components/gallery/gallery";


async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function safeJson(res) {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    try {
      const text = await res.text();
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

export default function App() {
  const [page, setPage] = useState("home");

  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const [membersError, setMembersError] = useState(null);
  const [membersLoadedOnce, setMembersLoadedOnce] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const initMembers = async () => {
      setMembersLoading(true);
      setMembersError(null);

      try {
        await fetchWithTimeout("/api/run_discord_bot", { method: "POST" }, 8000);

        const start = Date.now();
        while (Date.now() - start < 15000 && !cancelled) {
          let res;
          try {
            res = await fetchWithTimeout("/api/get_members", { cache: "no-store" }, 8000);
          } catch {
            await new Promise((r) => setTimeout(r, 750));
            continue;
          }

          const data = await safeJson(res);
          const list = Array.isArray(data?.members) ? data.members : [];

          if (res.status === 200 && list.length > 0) {
            if (!cancelled) setMembers([...list]);
            setMembersLoadedOnce(true);
            break;
          }

          await new Promise((r) => setTimeout(r, 750));
        }
      } catch (err) {
        if (!cancelled) setMembersError(err);
      } finally {
        if (!cancelled) setMembersLoading(false);
      }
    };

    // Run once on mount OR if you want to retry on demand, you can add a "retry counter" state.
    if (!membersLoadedOnce) initMembers();

    return () => {
      cancelled = true;
    };
  }, [membersLoadedOnce]);

  return (
    <Container fluid className="p-0 m-0">
      <Header page={page} setPage={setPage} />
      <Carousel />

      {page === "home" ? (
        <Home />
      ) : page === "schedule" ? (
        <Schedule />
      ) : page === "structure" ? (
        <Structure
          members={members}
          membersLoading={membersLoading}
          membersError={membersError}
        />
      ) : (
        <Gallery />
      )}
    </Container>
  );
}
