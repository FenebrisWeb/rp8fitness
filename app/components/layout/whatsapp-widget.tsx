"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

// Same placeholder number used for the tel: link elsewhere on the site
// (footer, FAQ support banner, BMI final CTA) — swap this in one place once
// a real WhatsApp Business number exists.
const WHATSAPP_NUMBER = "911234567890";

// text-base (16px) on mobile — anything smaller triggers iOS/Android's
// auto-zoom on focus. Back down to text-sm from sm: up.
const inputClasses =
  "w-full rounded-lg border border-chalk/15 bg-black/20 py-3 pl-4 pr-4 font-mono text-base text-chalk placeholder:text-chalk/50 transition-colors duration-200 focus:border-[#25D366] focus:outline-none focus:ring-2 focus:ring-[#25D366]/20 sm:text-sm";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18.2a8.1 8.1 0 01-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .2-1.1-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

type SubmitStatus = "idle" | "sending";

export default function WhatsAppWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) return;
    const id = window.setTimeout(() => setStatus("idle"), 400);
    return () => window.clearTimeout(id);
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    const lines = [
      "Hi RP8 Fitness! I'd like to know more.",
      name && `Name: ${name}`,
      phone && `Phone: ${phone}`,
      message && `Message: ${message}`,
    ].filter(Boolean);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

    // A brief delay so the "Opening WhatsApp..." state actually reads as
    // feedback instead of an instant tab-switch, then hand off to WhatsApp.
    window.setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setOpen(false);
    }, 500);
  };

  const widget = (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <>
            {/* Invisible click-catcher — closes the popover on an outside
                click without dimming or blurring the page behind it. */}
            <div className="fixed inset-0 z-[59]" onClick={() => setOpen(false)} />

            {/* Anchored just above the launcher, not a centered full-screen
                dialog — reads as a chat popover, not a page takeover. */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Chat with RP8 Fitness on WhatsApp"
              className="absolute bottom-[calc(100%+16px)] right-0 z-[60] flex w-[calc(100vw-2.5rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-2xl border border-chalk/15 bg-ink shadow-2xl ring-1 ring-black/40 sm:w-96"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* A chat-header look, not a generic form popup — signals
                  "this hands off to WhatsApp" before you even read the
                  copy. */}
              <div className="flex items-center gap-3 bg-[#075E54] px-5 py-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#25D366] text-white">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-sm font-black uppercase tracking-tight text-white">RP8 Fitness</p>
                  <p className="font-mono text-[10px] text-white/70">Typically replies within minutes</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4l16 16M20 4L4 20" />
                  </svg>
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
                <p className="font-mono text-xs leading-relaxed text-chalk/70 sm:text-sm">
                  Got a question about plans, zones or a free trial? Drop your details below, we reply fast and you can keep chatting right on WhatsApp.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
                  <input name="name" type="text" placeholder="Full Name" required className={inputClasses} />
                  <input name="phone" type="tel" placeholder="Phone Number" required className={inputClasses} />
                  <textarea
                    name="message"
                    placeholder="What would you like to know? (optional)"
                    rows={3}
                    className={`${inputClasses} resize-none`}
                  />

                  <button
                    type="submit"
                    disabled={status !== "idle"}
                    className="group relative mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-white transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-default"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {status === "idle" ? (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="flex items-center gap-2"
                        >
                          <WhatsAppIcon className="h-4 w-4" />
                          Connect Me On WhatsApp
                        </motion.span>
                      ) : (
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
                          Opening WhatsApp...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  <p className="text-center font-mono text-[10px] text-chalk/50">
                    Opens WhatsApp in a new tab with your details pre-filled.
                  </p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating launcher — a smooth, continuous breathing pulse (mirrored,
          so it eases back the same way it eased out instead of snapping)
          plus a soft ripple ring behind it. Both stop the instant the
          popover is open, so it doesn't fight the panel's own motion. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
        animate={open ? { scale: 1, opacity: 0 } : { scale: [1, 1.7], opacity: [0.45, 0] }}
        transition={open ? { duration: 0.2 } : { duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        animate={open ? { scale: 1 } : { scale: [1, 1.06, 1] }}
        transition={open ? { duration: 0.2 } : { duration: 1.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </motion.button>
    </div>
  );

  if (!mounted) return null;
  return createPortal(widget, document.body);
}
