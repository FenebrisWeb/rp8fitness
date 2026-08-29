"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import type { FaqHeroContent } from "@/app/types/faq-hero";

const FAQ_HERO_CONTENT: FaqHeroContent = {
  eyebrow: "FAQs",
  headlineLine1: "Questions?",
  headlineAccent: "We've Got Answers.",
  description: "Find answers to common questions about RP8 Fitness memberships, facilities, services and more.",
  searchPlaceholder: "Search your question here...",
  // Placeholder — reusing an existing gym photo until dedicated FAQ page
  // photography is ready.
  image: { src: "/HomePage/plans.webp", alt: "RP8 Fitness training floor" },
};

export default function FaqHeroSection({
  onSearch,
}: {
  onSearch?: (value: string) => void;
}) {
  const { eyebrow, headlineLine1, headlineAccent, description, searchPlaceholder, image } = FAQ_HERO_CONTENT;

  return (
    <section className="relative w-full">
      {/* Full-bleed banner photo — same treatment as the other page heroes:
          shown as-is, content overlaid on its own naturally dark left
          side, no gradient layered on top. */}
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
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-vivid">
                {eyebrow}
              </span>
              <span aria-hidden className="h-px w-10 bg-accent-vivid/40" />
            </motion.div>

            <h1 className="mt-3 font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-chalk sm:text-5xl">
              <AnimatedWords text={headlineLine1} className="block" />
              <AnimatedWords text={headlineAccent} className="block text-accent-vivid" />
            </h1>

            <motion.p variants={fadeUp} className="mt-4 max-w-md font-mono text-sm text-chalk sm:text-base">
              {description}
            </motion.p>

            <motion.div variants={fadeUp} className="relative mt-6 max-w-md">
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chalk/60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="search"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full rounded-full border border-chalk/25 bg-black/20 py-3.5 pl-11 pr-5 font-mono text-sm text-chalk placeholder:text-chalk/50 backdrop-blur-sm transition-colors duration-200 focus:border-accent-vivid focus:outline-none focus:ring-2 focus:ring-accent-vivid/20"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
