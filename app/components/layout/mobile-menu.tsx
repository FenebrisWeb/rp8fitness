"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

/** Two chevrons — a small "keep moving forward" mark for the fitness brand. */
function DoubleArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 2l6 6-6 6" />
      <path d="M16 2l6 6-6 6" />
    </svg>
  );
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const menu = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white/80 shadow-2xl backdrop-blur-2xl sm:w-[420px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between px-6 py-6 sm:px-10">
              <div className="flex items-center gap-2 text-black">
                <DoubleArrow className="h-4 w-8 text-coral" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                  Menu
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l16 16M20 4L4 20" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-6 sm:px-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-center gap-3 border-b border-black/10 py-4 font-display text-3xl font-black uppercase tracking-tight text-black transition-colors hover:text-coral sm:text-4xl"
                  >
                    <DoubleArrow className="h-3 w-6 flex-none text-coral opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-between px-6 py-8 font-mono text-xs uppercase tracking-[0.14em] text-black sm:px-10">
              <span>123 Fitness Ave, Your City, State</span>
              <DoubleArrow className="h-3 w-6 text-coral" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Portal to document.body — keeps the overlay out of the sticky header's
  // own stacking/backdrop-filter context, which otherwise made the glass
  // panel render as fully transparent (nested backdrop-blur compositing
  // bug).
  if (!mounted) return null;
  return createPortal(menu, document.body);
}
