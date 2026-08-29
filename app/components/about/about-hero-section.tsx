"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import type { AboutHeroContent } from "@/app/types/about-hero";

const ABOUT_HERO_CONTENT: AboutHeroContent = {
  eyebrow: "About RP8 Fitness",
  headlineLine1: "Built For",
  headlineAccent: "Real",
  headlineRest: "Results",
  description:
    "RP8 Fitness is more than a gym, it's a complete fitness ecosystem designed to help you train smarter, live stronger and be your best every day.",
  ctaLabel: "Watch Our Story",
  image: { src: "/pages/About Page Banner.webp", alt: "RP8 Fitness About page banner" },
};

export default function AboutHeroSection() {
  const { eyebrow, headlineLine1, headlineAccent, headlineRest, description, ctaLabel, image } =
    ABOUT_HERO_CONTENT;

  return (
    <section className="relative w-full">
      {/* Full-bleed banner photo — same photo (and same gradient, for the
          same legibility reason) as the homepage hero's first slide. */}
      <div className="group relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[1920/750]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          quality={85}
          priority
          className="object-cover transition-transform duration-[9000ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      </div>

      <div className="relative bg-ink px-5 py-8 sm:px-10 sm:py-10 md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:bg-transparent md:px-0 md:py-0 md:pointer-events-none">
        <div className="mx-auto w-full max-w-[1700px] md:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="max-w-lg pointer-events-auto"
          >
            <motion.span
              variants={fadeUp}
              className="block font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-vivid"
            >
              {eyebrow}
            </motion.span>

            <h1 className="mt-3 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-chalk sm:text-5xl">
              <AnimatedWords text={headlineLine1} className="block" />
              <span className="block">
                <AnimatedWords text={headlineAccent} className="text-accent-vivid" />{" "}
                <AnimatedWords text={headlineRest} />
              </span>
            </h1>

            <motion.p variants={fadeUp} className="mt-4 max-w-md font-mono text-sm text-chalk sm:text-base">
              {description}
            </motion.p>

            <motion.button
              variants={fadeUp}
              type="button"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-chalk/25 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk backdrop-blur-sm transition-colors hover:border-accent-vivid hover:text-accent-vivid"
            >
              <svg viewBox="0 0 12 14" className="h-3 w-3" fill="currentColor" aria-hidden>
                <path d="M0 0.5L12 7L0 13.5V0.5Z" />
              </svg>
              {ctaLabel}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
