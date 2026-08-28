"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Persistent site-wide nudge toward the BMI calculator — hidden on the
// calculator page itself (no point promoting the page you're already on),
// and dismissible per-visit without permanently disappearing on next
// navigation, so it keeps doing its job across the rest of the site.
export default function BmiWidget() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);

  if (pathname === "/bmi-calculator" || dismissed) return null;

  return (
    <div className="fixed bottom-[50px] left-0 z-40">
      <div className="relative flex items-center gap-2 rounded-r-xl border border-l-0 border-accent-vivid/60 bg-ink/95 py-2.5 pl-3 pr-8 shadow-[0_0_24px_rgba(0,0,0,0.4)] backdrop-blur-sm">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-accent-vivid text-accent-vivid-contrast">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 20h16M7 20v-6M12 20v-10M17 20v-4M6 12l4-4 3 3 5-5" />
          </svg>
        </span>

        <Link href="/bmi-calculator" className="cursor-pointer">
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-accent-vivid">Free Tool</p>
          <p className="font-mono text-xs font-bold text-chalk">RP8 BMI Calculator</p>
        </Link>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="absolute right-1.5 top-1.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-chalk/60 transition-colors hover:bg-chalk/10 hover:text-chalk"
        >
          <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M4 4l16 16M20 4L4 20" />
          </svg>
        </button>
      </div>
    </div>
  );
}
