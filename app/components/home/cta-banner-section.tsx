"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CtaBannerContent } from "@/app/types/cta-banner";

const CTA_BANNER_CONTENT: CtaBannerContent = {
  headline: "Ready To Start Your Fitness Journey?",
  description: "Join RP8 Fitness today for world class equipment, expert trainers and a community that keeps you motivated.",
  ctaLabel: "Join Now",
};

// Decorative radiating wave lines fanning out from the card's left edge —
// pure flourish, clipped by the card's own overflow-hidden.
function WaveLines() {
  const paths = [
    "M-60 260 Q 60 40 260 140",
    "M-60 300 Q 80 90 300 190",
    "M-60 340 Q 100 140 340 240",
    "M-60 380 Q 120 190 380 290",
    "M-60 420 Q 140 240 420 340",
  ];
  return (
    <svg
      viewBox="0 0 420 420"
      className="pointer-events-none absolute -left-6 -top-6 h-[130%] w-[45%] text-lime"
      aria-hidden
    >
      {paths.map((d, i) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.4 - i * 0.06} />
      ))}
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function CtaBannerSection() {
  const { headline, description, ctaLabel } = CTA_BANNER_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate overflow-hidden rounded-2xl border border-chalk/10 bg-ink px-6 py-8 text-center sm:rounded-3xl sm:px-10 sm:py-9"
        >
          <WaveLines />

          <div className="relative mx-auto flex max-w-xl flex-col items-center gap-3">
            <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-chalk sm:text-3xl">
              {headline}
            </h2>
            <p className="font-mono text-sm text-steel">{description}</p>

            <Link
              href="#"
              className="mt-3 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-ink transition-transform hover:scale-105"
            >
              {ctaLabel}
              <span aria-hidden className="text-sm leading-none">
                ↗
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
