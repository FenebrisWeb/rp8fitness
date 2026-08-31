"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import type { MembershipCtaContent } from "@/app/types/membership-cta";
import { useEnquiryModal } from "@/app/components/layout/enquiry-modal-context";

const MEMBERSHIP_CTA_CONTENT: MembershipCtaContent = {
  headlineLine1: "Ready To Start",
  headlineAccent: "Your Journey?",
  description: "Join RP8 Fitness today and be a part of a stronger, healthier community.",
  ctaLabel: "Join Now",
};

export default function MembershipCtaSection() {
  const { headlineLine1, headlineAccent, description, ctaLabel } = MEMBERSHIP_CTA_CONTENT;
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex flex-col items-center gap-6 rounded-2xl border border-chalk/10 bg-ink p-6 text-center sm:rounded-3xl sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:text-left"
        >
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
            <motion.span
              variants={fadeUp}
              className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-accent-vivid/50 text-accent-vivid"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
            </motion.span>

            <motion.div variants={fadeUp}>
              <p className="font-display text-xl font-black uppercase tracking-tight text-chalk sm:text-2xl">
                {headlineLine1} <span className="text-accent-vivid">{headlineAccent}</span>
              </p>
              <p className="mx-auto mt-1 max-w-sm font-mono text-sm text-chalk lg:mx-0">{description}</p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp}>
            <button
              type="button"
              onClick={() => openEnquiry({ variant: "join" })}
              className="flex-none cursor-pointer rounded-full bg-accent-vivid px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-transform hover:scale-105"
            >
              {ctaLabel}
              <span aria-hidden className="ml-2 text-sm leading-none">
                ›
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
