"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CtaBannerContent } from "@/app/types/cta-banner";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";

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
      className="pointer-events-none absolute -left-6 -top-6 h-[130%] w-[45%] text-accent-vivid"
      aria-hidden
    >
      {paths.map((d, i) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.4 - i * 0.06} />
      ))}
    </svg>
  );
}

export default function CtaBannerSection() {
  const { headline, description, ctaLabel } = CTA_BANNER_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative isolate overflow-hidden rounded-2xl border border-chalk/10 bg-ink px-6 py-8 text-center sm:rounded-3xl sm:px-10 sm:py-9"
        >
          <WaveLines />

          <div className="relative mx-auto flex max-w-xl flex-col items-center gap-3">
            <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-chalk sm:text-3xl">
              <AnimatedWords text={headline} />
            </h2>
            <motion.p variants={fadeUp} className="font-mono text-sm text-steel">
              {description}
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="#"
                className="group mt-3 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-accent-vivid px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-transform hover:scale-105 active:scale-95"
              >
                {ctaLabel}
                <span aria-hidden className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
