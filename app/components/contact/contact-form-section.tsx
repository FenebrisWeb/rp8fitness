"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { ContactFormContent } from "@/app/types/contact-form";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";

const CONTACT_FORM_CONTENT: ContactFormContent = {
  formHeadlineLine1: "Send Us A",
  formHeadlineAccent: "Message",
  privacyNote: "Your information is safe with us. We never share your data.",
  infoHeadlineLine1: "Get In",
  infoHeadlineAccent: "Touch",
  infoItems: [
    {
      id: "visit",
      title: "Visit Our Gym",
      lines: ["123 Fitness Ave,", "Your City, State - 123456", "India"],
    },
    {
      id: "call",
      title: "Call Us",
      lines: ["+91 12345 67890"],
      accentLine: true,
    },
    {
      id: "email",
      title: "Email Us",
      lines: ["info@rp8fitness.com"],
    },
    {
      id: "timings",
      title: "Gym Timings",
      lines: ["Mon - Sat: 5:00 AM - 11:00 PM", "Sun: 6:00 AM - 10:00 PM"],
    },
  ],
  followLabel: "Follow Us",
};

const SOCIAL_LINKS = [
  { id: "instagram", label: "Instagram", href: "#" },
  { id: "facebook", label: "Facebook", href: "#" },
  { id: "youtube", label: "YouTube", href: "#" },
  { id: "whatsapp", label: "WhatsApp", href: "#" },
] as const;

const INFO_ICONS: Record<string, string> = {
  visit: "M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 11a2 2 0 100-4 2 2 0 000 4z",
  call: "M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.3c1.1.4 2.3.6 3.6.6a1 1 0 011 1V20a1 1 0 01-1 1C10.6 21 3 13.4 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.3 1z",
  email: "M3 5h18v14H3zM3 7l9 6 9-6",
  timings: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3.5 2",
};

function InfoIcon({ id, className }: { id: string; className?: string }) {
  const d = INFO_ICONS[id] ?? INFO_ICONS.visit;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

function SocialIcon({ id, className }: { id: string; className?: string }) {
  switch (id) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path
            d="M14 8.3h-1.3c-.7 0-1.2.5-1.2 1.3V11h2.4l-.3 2.4h-2.1V19h-2.4v-5.6H7.5V11H9V9.3c0-1.9 1.2-3.3 3-3.3H14z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="4" />
          <path d="M10.5 9.5l4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.7-1.2A9 9 0 1012 3z" />
          <path d="M8.5 8.5c0 4 3 7 7 7 .9 0 1.5-.8 1.2-1.6l-.5-1.2a1 1 0 00-1.1-.6l-1.4.3a5.5 5.5 0 01-2.7-2.7l.3-1.4a1 1 0 00-.6-1.1L9.7 6.6c-.8-.3-1.6.3-1.6 1.2z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

// text-base (16px) on mobile — anything smaller makes iOS/Android
// auto-zoom the page on focus. Back down to text-sm from sm: up, where
// that zoom trigger no longer applies.
const inputClasses =
  "w-full rounded-lg border border-chalk/15 bg-black/20 py-3.5 pl-4 pr-11 font-mono text-base text-chalk placeholder:text-chalk/50 transition-colors duration-200 focus:border-accent-vivid focus:outline-none focus:ring-2 focus:ring-accent-vivid/20 sm:text-sm";

type SubmitStatus = "idle" | "sending" | "sent";

export default function ContactFormSection() {
  const { formHeadlineLine1, formHeadlineAccent, privacyNote, infoHeadlineLine1, infoHeadlineAccent, infoItems, followLabel } =
    CONTACT_FORM_CONTENT;

  const [status, setStatus] = useState<SubmitStatus>("idle");

  // No backend is wired up yet, so this simulates a brief send — long
  // enough for the button's loading/success states to actually read as
  // feedback rather than an instant flicker. Swap the timeout body for a
  // real submit call once an endpoint exists; the state machine stays the
  // same either way.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      window.setTimeout(() => setStatus("idle"), 2600);
    }, 900);
  };

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="rounded-2xl border border-chalk/10 bg-ink p-6 sm:rounded-3xl sm:p-8"
          >
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-chalk sm:text-3xl">
              <AnimatedWords text={formHeadlineLine1} /> <AnimatedWords text={formHeadlineAccent} className="text-accent-vivid" />
            </h2>
            <motion.span variants={fadeUp} aria-hidden className="mt-2 block h-1 w-10 rounded-full bg-accent-vivid" />

            <motion.form variants={fadeUp} onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="relative">
                <input type="text" placeholder="Full Name" required className={inputClasses} />
                <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chalk/50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20a7 7 0 0114 0" />
                </svg>
              </div>

              <div className="relative">
                <input type="email" placeholder="Email Address" required className={inputClasses} />
                <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chalk/50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
              </div>

              <div className="relative">
                <input type="tel" placeholder="Phone Number" className={inputClasses} />
                <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chalk/50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.3c1.1.4 2.3.6 3.6.6a1 1 0 011 1V20a1 1 0 01-1 1C10.6 21 3 13.4 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.3 1z" />
                </svg>
              </div>

              <div className="relative">
                <select defaultValue="" className={`${inputClasses} appearance-none`}>
                  <option value="" disabled>
                    Subject
                  </option>
                  <option value="membership">Membership</option>
                  <option value="franchise">Franchise</option>
                  <option value="general">General Enquiry</option>
                  <option value="feedback">Feedback</option>
                </select>
                <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chalk/50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              <div className="relative">
                <textarea placeholder="Your Message" rows={4} required className={`${inputClasses} resize-none`} />
                <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-4 h-4 w-4 text-chalk/50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
                </svg>
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className={`group relative mt-1 flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.1em] transition-all active:scale-95 disabled:cursor-default ${
                  status === "sent" ? "bg-p10 text-chalk" : "bg-accent-vivid text-accent-vivid-contrast hover:scale-[1.02]"
                }`}
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
                      Send Message
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
                      Sending...
                    </motion.span>
                  )}
                  {status === "sent" && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center gap-2"
                    >
                      <motion.svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <motion.path
                          d="M5 13l4 4L19 7"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </motion.svg>
                      Message Sent!
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <p className="flex items-center gap-2 font-mono text-[11px] text-chalk/60">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-none" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 018 0v3" />
                </svg>
                {privacyNote}
              </p>
            </motion.form>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
              <AnimatedWords text={infoHeadlineLine1} /> <AnimatedWords text={infoHeadlineAccent} className="text-accent-strong" />
            </h2>
            <motion.span variants={fadeUp} aria-hidden className="mt-2 block h-1 w-10 rounded-full bg-accent-strong" />

            <motion.div
              variants={staggerContainerTight}
              className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible sm:pb-0"
            >
              {infoItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUpItem}
                  className="flex w-[260px] flex-none snap-start items-center gap-4 rounded-xl border border-chalk/10 bg-ink p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-vivid/40 sm:w-auto"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-accent-vivid/50 text-accent-vivid">
                    <InfoIcon id={item.id} className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk">
                      {item.title}
                    </p>
                    <div className={`mt-1 font-mono text-sm ${item.accentLine ? "text-accent-vivid" : "text-chalk"}`}>
                      {item.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                  <span aria-hidden className="flex-none text-chalk/40">
                    ›
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-foreground">
                {followLabel}
              </span>
              <motion.div variants={staggerContainerTight} className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <motion.div key={social.id} variants={fadeUpItem}>
                    <Link
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-foreground/25 text-foreground transition-colors hover:border-accent-strong hover:text-accent-strong"
                    >
                      <SocialIcon id={social.id} className="h-4 w-4" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
