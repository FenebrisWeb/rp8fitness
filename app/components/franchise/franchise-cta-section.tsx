"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { FranchiseCtaContent } from "@/app/types/franchise-cta";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import { useEnquiryModal } from "@/app/components/layout/enquiry-modal-context";

const FRANCHISE_CTA_CONTENT: FranchiseCtaContent = {
  headlineLine1: "Ready To Build A",
  headlineAccent: "Stronger Future?",
  description: "Join RP8 Fitness and be a part of a movement that's shaping the future of fitness in India.",
  primaryCtaLabel: "Apply For Franchise",
  secondaryCtaLabel: "Download Brochure",
};

export default function FranchiseCtaSection() {
  const { headlineLine1, headlineAccent, description, primaryCtaLabel, secondaryCtaLabel } =
    FRANCHISE_CTA_CONTENT;
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex flex-col items-center gap-8 rounded-2xl border border-chalk/10 bg-ink p-6 text-center sm:rounded-3xl sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:text-left"
        >
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-chalk sm:text-3xl">
              <AnimatedWords text={headlineLine1} />
              <br />
              <AnimatedWords text={headlineAccent} className="text-accent-vivid" />
            </h2>
            <motion.p variants={fadeUp} className="mt-3 font-mono text-sm text-chalk">{description}</motion.p>
          </div>

          <motion.div variants={fadeUp} className="flex flex-none flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openEnquiry({ variant: "franchise" })}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent-vivid px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-transform hover:scale-105 active:scale-95"
            >
              {primaryCtaLabel}
              <span aria-hidden className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-1">
                ›
              </span>
            </button>

            <button
              type="button"
              onClick={() => openEnquiry({ variant: "brochure" })}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-chalk/25 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk transition-colors hover:border-accent-vivid hover:text-accent-vivid"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v13M7 11l5 5 5-5M4 20h16" />
              </svg>
              {secondaryCtaLabel}
            </button>
          </motion.div>

          {/* Decorative brochure thumbnail — a stand-in until a real
              franchise brochure PDF/cover exists to preview. */}
          <motion.div variants={fadeUp} className="relative hidden h-28 w-20 flex-none -rotate-6 overflow-hidden rounded-lg border border-accent-vivid/40 bg-black shadow-2xl lg:block">
            <Image src="/rp8-logo.png" alt="" fill className="object-contain p-3 opacity-80" aria-hidden />
            <p className="absolute inset-x-0 bottom-2 font-mono text-[7px] font-bold uppercase leading-tight text-chalk">
              Franchise
              <br />
              Brochure
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
