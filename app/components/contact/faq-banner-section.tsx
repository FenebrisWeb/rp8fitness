"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FaqBannerContent } from "@/app/types/faq-banner";

const FAQ_BANNER_CONTENT: FaqBannerContent = {
  headlineLine1: "Have Questions?",
  headlineAccent: "We Have Answers.",
  description: "Check out our FAQ section for quick answers to common questions.",
  ctaLabel: "View FAQs",
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function FaqBannerSection() {
  const { headlineLine1, headlineAccent, description, ctaLabel } = FAQ_BANNER_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 rounded-2xl border border-chalk/10 bg-ink p-6 text-center sm:rounded-3xl sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:text-left"
        >
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-accent-strong/50 text-accent-strong">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 5h16v11H8l-4 4z" />
              </svg>
            </span>

            <div className="lg:pl-4 lg:border-l lg:border-chalk/10">
              <p className="font-display text-lg font-black uppercase tracking-tight text-chalk">
                {headlineLine1} <span className="text-accent-strong">{headlineAccent}</span>
              </p>
              <p className="mt-1 max-w-sm font-mono text-sm text-chalk">{description}</p>
            </div>
          </div>

          <Link
            href="#"
            className="inline-flex flex-none cursor-pointer items-center gap-2 rounded-full border border-chalk/25 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk transition-colors hover:border-accent-strong hover:text-accent-strong"
          >
            {ctaLabel}
            <span aria-hidden className="text-sm leading-none">
              ›
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
