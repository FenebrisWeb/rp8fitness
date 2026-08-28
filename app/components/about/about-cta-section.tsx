"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { AboutCtaContent } from "@/app/types/about-cta";

const ABOUT_CTA_CONTENT: AboutCtaContent = {
  headlineLine1: "Ready To Start",
  headlineLine2: "Your Journey?",
  description: "Join RP8 Fitness today and be a part of a stronger, healthier community.",
  primaryCtaLabel: "Join Now",
  secondaryCtaLabel: "Book A Tour",
  image: { src: "/HomePage/plans.webp", alt: "Member training at RP8 Fitness" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function AboutCtaSection() {
  const { headlineLine1, headlineLine2, description, primaryCtaLabel, secondaryCtaLabel, image } =
    ABOUT_CTA_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate flex min-h-[280px] flex-col justify-center overflow-hidden rounded-2xl border border-chalk/10 sm:min-h-[300px] sm:rounded-3xl"
        >
          {/* Shown as-is, no gradient layered on top — the photo's own
              dark left half is where the copy sits. */}
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="-z-10 object-cover" />

          <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-12">
            <div className="max-w-md">
              <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-chalk sm:text-3xl">
                {headlineLine1}
                <br />
                <span className="text-lime">{headlineLine2}</span>
              </h2>
              <p className="mt-3 font-mono text-sm text-chalk">{description}</p>
            </div>

            <div className="flex flex-none flex-wrap items-center gap-3">
              <Link
                href="#"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-ink transition-transform hover:scale-105"
              >
                {primaryCtaLabel}
                <span aria-hidden className="text-sm leading-none">
                  ›
                </span>
              </Link>

              <Link
                href="#"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-chalk/25 bg-black/30 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk backdrop-blur-sm transition-colors hover:border-lime hover:text-lime"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </svg>
                {secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
