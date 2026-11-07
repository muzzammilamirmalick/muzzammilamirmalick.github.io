// The bar across the top of MuzzOS. The mute button sits over its right end.
import { useEffect, useState } from "react";
import { profile } from "../data/content.js";

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

function Clock() {
  const now = useClock();
  // The clock changes every second, so screen readers are told to skip it.
  return (
    <span className="topbar-clock" aria-hidden="true">
      {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

export default function TopBar() {
  return (
    <header className="topbar">
      {/* The page title for screen readers and search engines. */}
      <h1 className="sr-only">
        {profile.name}: {profile.role}. {profile.availability}.
      </h1>
      <span className="topbar-name" aria-hidden="true">
        MuzzOS
      </span>
      <Clock />
      <a className="topbar-link" href="/simple.html">
        Simple view
      </a>
    </header>
  );
}
