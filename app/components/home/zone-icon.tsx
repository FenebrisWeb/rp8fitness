const PATHS: Record<string, string> = {
  cardio: "M20 12h-3l-2 6-4-12-2 6H4",
  strength: "M4 8v8M20 8v8M7 6v12M17 6v12M2 10v4M22 10v4M7 12h10",
  zumba: "M12 2v6M9 5l3 3 3-3M6 22l6-8 6 8M9 14a3 3 0 106 0",
  crossfit: "M12 3v18M5 9l7-6 7 6M5 15l7 6 7-6",
  boxing: "M7 8a3 3 0 016 0v3h3a3 3 0 013 3v2a5 5 0 01-5 5H9a5 5 0 01-5-5v-4a4 4 0 014-4z",
  pickleball: "M12 3a9 9 0 100 18 9 9 0 000-18zM9 9l6 6M15 9l-6 6",
  pool: "M4 20a8 3 0 0016 0M12 4v13M8 7l4-3 4 3",
  cafe: "M5 9h11a3 3 0 010 6h-1M5 9v6a4 4 0 004 4h2a4 4 0 004-4v-1M5 9V6h9v3M3 21h14",
  supplement: "M9 3h6v4H9zM7 7h10a2 2 0 012 2v9a3 3 0 01-3 3H8a3 3 0 01-3-3v-9a2 2 0 012-2zM7 13h10",
  closet: "M4 3h16v18H4zM12 3v18M9 12h.01M15 12h.01",
};

export default function ZoneIcon({ name, className }: { name: string; className?: string }) {
  const d = PATHS[name] ?? PATHS.strength;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}
