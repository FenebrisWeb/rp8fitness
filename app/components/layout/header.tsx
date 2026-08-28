"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import MobileMenu from "./mobile-menu";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Membership", href: "#" },
  { label: "Trainers", href: "#" },
  { label: "Franchise", href: "/franchise" },
  { label: "About Us", href: "/about" },
  { label: "FAQs", href: "/faq" },
  { label: "BMI Calculator", href: "/bmi-calculator" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1700px] items-center justify-between gap-6 px-6 py-3 sm:px-10 sm:py-4">
        <Link href="/" className="flex-none">
          <Image
            src="/rp8-logo.png"
            alt="RP8 Fitness"
            width={400}
            height={159}
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <span className="ml-auto mr-auto hidden whitespace-nowrap font-mono text-xs uppercase tracking-[0.1em] text-foreground md:block">
          123 Fitness Ave, Your City, State
        </span>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Link
            href="#"
            className="flex items-center gap-2 rounded-full bg-accent-strong px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-accent-strong-contrast transition-opacity hover:opacity-90"
          >
            Join Now
            <span aria-hidden className="text-sm leading-none">
              ↗
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex h-8 w-8 flex-col items-end justify-center gap-1.5 text-foreground"
          >
            <span className="h-[2px] w-6 bg-current" />
            <span className="h-[2px] w-4 bg-current" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </header>
  );
}
