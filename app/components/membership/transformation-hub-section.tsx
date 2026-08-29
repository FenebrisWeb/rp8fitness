"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import DragScrollRow from "@/app/components/shared/drag-scroll-row";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";
import type { TransformationHubContent } from "@/app/types/transformation-hub";

const TRANSFORMATION_HUB_CONTENT: TransformationHubContent = {
  eyebrow: "Why Join RP8?",
  headlineLine1: "More Than A Gym.",
  headlineBefore: "A",
  headlineAccent: "Transformation",
  headlineAfter: "Hub.",
  features: [
    { id: "equipment", label: "World Class Equipment", description: "Imported German technology." },
    { id: "trainers", label: "Expert Trainers", description: "Certified & experienced professionals." },
    { id: "facilities", label: "Premium Facilities", description: "Clean, spacious & hygienic." },
    { id: "community", label: "Community That Motivates", description: "Train together, grow together." },
  ],
  video: { src: "/HomePage/hero-banner01.webp", alt: "Member training at RP8 Fitness" },
};

const FEATURE_ICONS: Record<string, string> = {
  equipment: "M4 8v8M20 8v8M7 6v12M17 6v12M2 10v4M22 10v4M7 12h10",
  trainers: "M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3zM8.7 12.2l2.3 2.3 4.3-4.5",
  facilities: "M4 21h16M6 21V9l6-5 6 5v12M10 21v-6h4v6",
  community:
    "M8 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20v-.5A4 4 0 016 15.5h1a4 4 0 013.5 2M13.5 17.5A4 4 0 0117 15.5h1a4 4 0 014 4v.5",
};

function FeatureIcon({ id, className }: { id: string; className?: string }) {
  const d = FEATURE_ICONS[id] ?? FEATURE_ICONS.equipment;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

export default function TransformationHubSection() {
  const { eyebrow, headlineLine1, headlineBefore, headlineAccent, headlineAfter, features, video } =
    TRANSFORMATION_HUB_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12"
        >
          <motion.div
            variants={fadeUp}
            className="relative h-[240px] w-full flex-none overflow-hidden rounded-2xl lg:h-[320px] lg:w-[440px]"
          >
            <Image
              src={video.src}
              alt={video.alt}
              fill
              sizes="(min-width: 1024px) 440px, 100vw"
              className="object-cover animate-slow-zoom"
            />
            <button
              type="button"
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-accent-vivid text-accent-vivid-contrast transition-transform hover:scale-105"
            >
              <svg width="16" height="18" viewBox="0 0 12 14" fill="currentColor">
                <path d="M0 0.5L12 7L0 13.5V0.5Z" />
              </svg>
            </button>
          </motion.div>

          <div className="flex-1">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-strong">
                {eyebrow}
              </span>
              <span aria-hidden className="text-accent-strong">
                ›
              </span>
            </motion.div>

            <h2 className="mt-3 font-display text-2xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
              <span className="block">
                <AnimatedWords text={headlineLine1} />
              </span>
              <span className="block">
                <AnimatedWords text={headlineBefore} className="inline" /> <AnimatedWords text={headlineAccent} className="inline text-accent-strong" /> <AnimatedWords text={headlineAfter} className="inline" />
              </span>
            </h2>

            {/* Four feature callouts — a drag/swipe row below sm, where a
                4-up grid would otherwise cramp each label+caption pair. */}
            <DragScrollRow className="mt-6 gap-4 sm:hidden">
              {features.map((feature) => (
                <div key={feature.id} className="w-[150px] flex-none">
                  <FeatureIcon id={feature.id} className="h-6 w-6 text-accent-strong" />
                  <p className="mt-2 font-mono text-xs font-bold uppercase leading-snug tracking-[0.02em] text-foreground">
                    {feature.label}
                  </p>
                  <p className="mt-1 font-mono text-xs leading-snug text-foreground/70">{feature.description}</p>
                </div>
              ))}
            </DragScrollRow>

            <motion.div variants={staggerContainerTight} className="mt-6 hidden grid-cols-2 gap-6 sm:grid">
              {features.map((feature) => (
                <motion.div key={feature.id} variants={fadeUpItem}>
                  <FeatureIcon id={feature.id} className="h-6 w-6 text-accent-strong" />
                  <p className="mt-2 font-mono text-xs font-bold uppercase leading-snug tracking-[0.02em] text-foreground">
                    {feature.label}
                  </p>
                  <p className="mt-1 font-mono text-xs leading-snug text-foreground/70">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
