"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface JoinNowModalProps {
  open: boolean;
  onClose: () => void;
}

const PERKS = [
  "1 free trial session — no card required",
  "20% off your first month, locked in today",
  "Free body composition & goal-setting session",
];

const inputClasses =
  "w-full rounded-lg border border-chalk/15 bg-black/20 py-3.5 pl-4 pr-11 font-mono text-sm text-chalk placeholder:text-chalk/50 transition-colors duration-200 focus:border-accent-vivid focus:outline-none focus:ring-2 focus:ring-accent-vivid/20";

type SubmitStatus = "idle" | "sending" | "sent";

export default function JoinNowModal({ open, onClose }: JoinNowModalProps) {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  useEffect(() => setMounted(true), []);

  // Lock background scroll while the modal is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Reset back to the form a moment after the panel has fully closed, so a
  // returning visitor never reopens straight into a stale "sent" state.
  useEffect(() => {
    if (open) return;
    const id = window.setTimeout(() => setStatus("idle"), 400);
    return () => window.clearTimeout(id);
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
    }, 900);
  };

  const modal = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[61] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Join RP8 Fitness"
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-chalk/10 bg-ink shadow-2xl sm:rounded-3xl"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-chalk/70 transition-colors hover:bg-chalk/10 hover:text-chalk"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l16 16M20 4L4 20" />
                </svg>
              </button>

              <div className="px-6 pb-8 pt-8 sm:px-8">
                <AnimatePresence mode="wait" initial={false}>
                  {status !== "sent" ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-vivid/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-vivid">
                        Limited slots this month
                      </span>

                      <h2 className="mt-4 font-display text-2xl font-black uppercase leading-[0.95] tracking-tight text-chalk sm:text-3xl">
                        Your Fitness Story
                        <span className="block text-accent-vivid">Starts Today</span>
                      </h2>

                      <p className="mt-3 font-mono text-xs leading-relaxed text-chalk/70 sm:text-sm">
                        Leave your details and a coach will call you back to lock in your spot — before it&apos;s gone.
                      </p>

                      <ul className="mt-5 flex flex-col gap-2.5">
                        {PERKS.map((perk) => (
                          <li key={perk} className="flex items-start gap-2.5 font-mono text-xs text-chalk sm:text-sm">
                            <svg
                              viewBox="0 0 24 24"
                              className="mt-0.5 h-4 w-4 flex-none text-accent-vivid"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                            {perk}
                          </li>
                        ))}
                      </ul>

                      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                        <div className="relative">
                          <input type="text" placeholder="Full Name" required className={inputClasses} />
                          <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chalk/50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <circle cx="12" cy="8" r="3.5" />
                            <path d="M5 20a7 7 0 0114 0" />
                          </svg>
                        </div>

                        <div className="relative">
                          <input type="tel" placeholder="Phone Number" required className={inputClasses} />
                          <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chalk/50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.3c1.1.4 2.3.6 3.6.6a1 1 0 011 1V20a1 1 0 01-1 1C10.6 21 3 13.4 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.3 1z" />
                          </svg>
                        </div>

                        <div className="relative">
                          <input type="email" placeholder="Email Address" className={inputClasses} />
                          <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chalk/50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="M4 7l8 6 8-6" />
                          </svg>
                        </div>

                        <button
                          type="submit"
                          disabled={status !== "idle"}
                          className="group relative mt-1 flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-accent-vivid px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-default"
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {status === "idle" && (
                              <motion.span
                                key="idle"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.18 }}
                                className="flex items-center gap-2"
                              >
                                Claim My Spot
                                <span aria-hidden className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-1">
                                  ›
                                </span>
                              </motion.span>
                            )}
                            {status === "sending" && (
                              <motion.span
                                key="sending"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.18 }}
                                className="flex items-center gap-2"
                              >
                                <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden>
                                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
                                  <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                                Securing your spot...
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>

                        <p className="flex items-center justify-center gap-2 text-center font-mono text-[10px] text-chalk/50">
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-none" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <rect x="4" y="10" width="16" height="10" rx="2" />
                            <path d="M8 10V7a4 4 0 018 0v3" />
                          </svg>
                          No spam, just gains. Your info stays private.
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center py-4 text-center"
                    >
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-vivid text-accent-vivid-contrast"
                      >
                        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <motion.path
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                          />
                        </svg>
                      </motion.span>
                      <h2 className="mt-5 font-display text-2xl font-black uppercase tracking-tight text-chalk">
                        You&apos;re In!
                      </h2>
                      <p className="mt-2 max-w-xs font-mono text-xs leading-relaxed text-chalk/70 sm:text-sm">
                        Your spot is reserved. A coach will call you within 24 hours to get you started.
                      </p>
                      <button
                        type="button"
                        onClick={onClose}
                        className="mt-6 rounded-full border border-chalk/20 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk transition-colors hover:border-accent-vivid hover:text-accent-vivid"
                      >
                        Done
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
