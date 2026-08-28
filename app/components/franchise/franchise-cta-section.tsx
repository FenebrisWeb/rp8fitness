"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { FranchiseCtaContent } from "@/app/types/franchise-cta";

const FRANCHISE_CTA_CONTENT: FranchiseCtaContent = {
  headlineLine1: "Ready To Build A",
  headlineAccent: "Stronger Future?",
  description: "Join RP8 Fitness and be a part of a movement that's shaping the future of fitness in India.",
  primaryCtaLabel: "Apply For Franchise",
  secondaryCtaLabel: "Download Brochure",
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function FranchiseCtaSection() {
  const { headlineLine1, headlineAccent, description, primaryCtaLabel, secondaryCtaLabel } =
    FRANCHISE_CTA_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-8 rounded-2xl border border-chalk/10 bg-ink p-6 text-center sm:rounded-3xl sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:text-left"
        >
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-chalk sm:text-3xl">
              {headlineLine1}
              <br />
              <span className="text-accent-vivid">{headlineAccent}</span>
            </h2>
            <p className="mt-3 font-mono text-sm text-chalk">{description}</p>
          </div>

          <div className="flex flex-none flex-wrap items-center justify-center gap-3">
            <Link
              href="#"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent-vivid px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-transform hover:scale-105"
            >
              {primaryCtaLabel}
              <span aria-hidden className="text-sm leading-none">
                ›
              </span>
            </Link>

            <Link
              href="#"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-chalk/25 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk transition-colors hover:border-accent-vivid hover:text-accent-vivid"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v13M7 11l5 5 5-5M4 20h16" />
              </svg>
              {secondaryCtaLabel}
            </Link>
          </div>

          {/* Decorative brochure thumbnail — a stand-in until a real
              franchise brochure PDF/cover exists to preview. */}
          <div className="relative hidden h-28 w-20 flex-none -rotate-6 overflow-hidden rounded-lg border border-accent-vivid/40 bg-black shadow-2xl lg:block">
            <Image src="/rp8-logo.png" alt="" fill className="object-contain p-3 opacity-80" aria-hidden />
            <p className="absolute inset-x-0 bottom-2 font-mono text-[7px] font-bold uppercase leading-tight text-chalk">
              Franchise
              <br />
              Brochure
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
