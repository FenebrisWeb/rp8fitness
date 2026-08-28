"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { AboutHeroContent } from "@/app/types/about-hero";

const ABOUT_HERO_CONTENT: AboutHeroContent = {
  eyebrow: "About RP8 Fitness",
  headlineLine1: "Built For",
  headlineAccent: "Real",
  headlineRest: "Results",
  description:
    "RP8 Fitness is more than a gym, it's a complete fitness ecosystem designed to help you train smarter, live stronger and be your best every day.",
  ctaLabel: "Watch Our Story",
  // Placeholder — reusing the homepage hero's action shot until dedicated
  // About page photography is ready.
  image: { src: "/HomePage/hero-banner01.webp", alt: "Athlete training at RP8 Fitness" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function AboutHeroSection() {
  const { eyebrow, headlineLine1, headlineAccent, headlineRest, description, ctaLabel, image } =
    ABOUT_HERO_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14"
        >
          <div className="max-w-lg flex-none">
            <div className="flex items-center gap-3">
              <span className="whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-strong">
                {eyebrow}
              </span>
              <span aria-hidden className="h-px max-w-[80px] flex-1 bg-accent-strong/40" />
            </div>

            <h1 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
              <span className="block">{headlineLine1}</span>
              <span className="block">
                <span className="text-accent-strong">{headlineAccent}</span> {headlineRest}
              </span>
            </h1>

            <p className="mt-4 max-w-md font-mono text-sm text-foreground sm:text-base">{description}</p>

            <button
              type="button"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-foreground/20 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-accent-strong hover:text-accent-strong"
            >
              <svg viewBox="0 0 12 14" className="h-3 w-3" fill="currentColor" aria-hidden>
                <path d="M0 0.5L12 7L0 13.5V0.5Z" />
              </svg>
              {ctaLabel}
            </button>
          </div>

          <div className="relative h-[320px] w-full flex-1 overflow-hidden rounded-2xl sm:h-[420px] lg:h-[480px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
