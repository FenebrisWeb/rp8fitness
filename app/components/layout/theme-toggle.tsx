"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  const toggle = () => {
    const next = isLight ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
    setIsLight(next === "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      className="relative flex h-8 w-14 flex-none items-center rounded-full border border-foreground/20 bg-foreground/5 px-1 transition-colors"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 ${
          isLight ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isLight ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
          </svg>
        )}
      </span>
    </button>
  );
}
