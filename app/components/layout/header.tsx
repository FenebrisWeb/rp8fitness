"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import MobileMenu from "./mobile-menu";
import { useEnquiryModal } from "./enquiry-modal-context";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Membership", href: "/membership" },
  { label: "Franchise", href: "/franchise" },
  { label: "About Us", href: "/about" },
  { label: "FAQs", href: "/faq" },
  { label: "BMI Calculator", href: "/bmi-calculator" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openEnquiry } = useEnquiryModal();

  // A slightly denser, shadowed header once the page has actually scrolled —
  // reads as "lifted off the page" instead of always looking identical.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-foreground/10 bg-background/95 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
          : "border-transparent bg-background/80 shadow-none"
      }`}
    >
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

        <Link
          href="https://www.google.com/maps/search/?api=1&query=Balram+Nagar+Loni+Ghaziabad+Uttar+Pradesh+201102"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto mr-auto hidden whitespace-nowrap font-mono text-xs uppercase tracking-[0.1em] text-foreground transition-colors hover:text-accent-strong md:block"
        >
          Balram Nagar, Loni, Ghaziabad, UP 201102
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => openEnquiry({ variant: "join" })}
            className="group flex items-center gap-2 rounded-full bg-accent-strong px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-accent-strong-contrast transition-transform hover:scale-105 active:scale-95"
          >
            Join Now
            <span aria-hidden className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="group flex h-8 w-8 flex-col items-end justify-center gap-1.5 text-foreground"
          >
            <span
              className={`h-[2px] w-6 bg-current transition-all duration-300 group-hover:w-6 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] bg-current transition-all duration-300 ${
                menuOpen ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4 group-hover:w-6"
              }`}
            />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </header>
  );
}
