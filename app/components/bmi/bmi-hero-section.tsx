"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";
import type { BmiHeroContent } from "@/app/types/bmi";

const BMI_HERO_CONTENT: BmiHeroContent = {
  eyebrow: "RP8 BMI Calculator",
  headlineLine1: "Know Your BMI.",
  headlineAccent: "Transform",
  headlineRest: "Your Life.",
  description: "Your body mass index is more than a number. It's the first step towards a stronger, healthier you.",
  pointers: [
    { id: "easy", title: "Quick & Easy" },
    { id: "private", title: "100% Private" },
    { id: "advice", title: "Personalized Advice" },
  ],
  // Placeholder — reusing an existing gym photo until dedicated calculator
  // page photography is ready.
  image: { src: "/HomePage/plans.webp", alt: "RP8 Fitness training floor" },
};

const ICON_PATHS: Record<string, string> = {
  easy: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 6a6 6 0 100 12 6 6 0 000-12zM12 10a2 2 0 100 4 2 2 0 000-4z",
  private: "M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3zM8.7 12.2l2.3 2.3 4.3-4.5",
  advice: "M4 20h16M7 20v-6M12 20v-10M17 20v-4M6 12l4-4 3 3 5-5",
};

function PointerIcon({ id, className }: { id: string; className?: string }) {
  const d = ICON_PATHS[id] ?? ICON_PATHS.easy;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

export default function BmiHeroSection() {
  const { eyebrow, headlineLine1, headlineAccent, headlineRest, description, pointers, image } = BMI_HERO_CONTENT;

  return (
    <section className="relative w-full">
      {/* Full-bleed banner photo — same treatment as every other page
          hero: shown as-is, content overlaid on its own naturally dark
          left side, no gradient layered on top. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[1920/750]">
        <Image src={image.src} alt={image.alt} fill sizes="100vw" quality={85} priority className="object-cover animate-slow-zoom" />
      </div>

      <div className="relative bg-ink px-5 py-8 sm:px-10 sm:py-10 md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:bg-transparent md:px-0 md:py-0">
        <div className="mx-auto w-full max-w-[1700px] md:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="max-w-lg"
          >
            <motion.span
              variants={fadeUp}
              className="block font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-vivid"
            >
              {eyebrow}
            </motion.span>

            <h1 className="mt-3 font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-chalk sm:text-5xl">
              <AnimatedWords text={headlineLine1} className="block" />
              <span className="block">
                <AnimatedWords text={headlineAccent} className="text-accent-vivid" /> <AnimatedWords text={headlineRest} />
              </span>
            </h1>

            <motion.p variants={fadeUp} className="mt-4 max-w-md font-mono text-sm text-chalk sm:text-base">
              {description}
            </motion.p>

            <motion.div variants={staggerContainerTight} className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {pointers.map((pointer) => (
                <motion.div key={pointer.id} variants={fadeUpItem}>
                  <PointerIcon id={pointer.id} className="h-6 w-6 text-accent-vivid" />
                  <p className="mt-2 font-mono text-sm font-bold text-chalk">{pointer.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
