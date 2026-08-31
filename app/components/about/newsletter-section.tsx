"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { NewsletterContent } from "@/app/types/newsletter";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";

const NEWSLETTER_CONTENT: NewsletterContent = {
  headline: "Stay Updated",
  description: "Get the latest offers, fitness tips and event updates straight to your inbox.",
  ctaLabel: "Subscribe",
  followLabel: "Follow Us",
};

const SOCIAL_LINKS = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/rp8fitness?igsi=NnpzZ3RybWFoaW9q" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/share/19TikPdkd3/?mibextid=wwXIfr" },
] as const;

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
    default:
      return null;
  }
}

export default function NewsletterSection() {
  const { headline, description, ctaLabel, followLabel } = NEWSLETTER_CONTENT;
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (subscribed) return;
    setSubscribed(true);
    window.setTimeout(() => setSubscribed(false), 3200);
  };

  return (
    <section className="border-t border-white/10 bg-black">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto flex w-full max-w-[1700px] flex-col items-center gap-8 px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left"
      >
        <motion.div variants={fadeUp} className="flex flex-none items-start gap-3 sm:max-w-xs">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-accent-vivid/50 text-accent-vivid">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M4 7l8 6 8-6" />
            </svg>
          </span>
          <div>
            <p className="font-display text-sm font-black uppercase tracking-tight text-chalk">{headline}</p>
            <p className="mt-1 font-mono text-xs text-chalk">{description}</p>
          </div>
        </motion.div>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-none items-center gap-2 sm:w-auto"
        >
          <AnimatePresence mode="wait" initial={false}>
            {subscribed ? (
              <motion.p
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full font-mono text-xs font-bold text-accent-vivid sm:w-56"
              >
                You&apos;re subscribed!
              </motion.p>
            ) : (
              <motion.input
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                type="email"
                required
                placeholder="Enter your email"
                className="w-full min-w-0 rounded-full border border-chalk/20 bg-transparent px-4 py-2.5 font-mono text-base text-chalk placeholder:text-steel transition-colors duration-200 focus:border-accent-vivid focus:outline-none focus:ring-2 focus:ring-accent-vivid/20 sm:w-56 sm:text-xs"
              />
            )}
          </AnimatePresence>
          <button
            type="submit"
            disabled={subscribed}
            className="flex-none cursor-pointer rounded-full bg-accent-vivid px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-transform hover:scale-105 disabled:cursor-default disabled:opacity-60"
          >
            {ctaLabel}
          </button>
        </motion.form>

        <motion.div variants={fadeUp} className="flex flex-none items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chalk">
            {followLabel}
          </span>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.id}
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-chalk/25 text-chalk transition-colors hover:border-accent-vivid hover:text-accent-vivid"
              >
                <SocialIcon id={social.id} className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
