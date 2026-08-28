"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { OurStoryContent } from "@/app/types/our-story";

const OUR_STORY_CONTENT: OurStoryContent = {
  eyebrow: "Our Story",
  headlineLines: ["A Community.", "A Lifestyle.", "A Promise."],
  description:
    "Founded with a vision to redefine fitness in our city, RP8 Fitness brings world class training, premium facilities and a motivating environment under one roof. Whether you're here to build strength, improve endurance or simply feel better, we're here to support you every step of the way.",
  signatureCaption: "Founder, RP8 Fitness",
  mission: {
    title: "Our Mission",
    description:
      "To empower every individual to achieve their fitness goals through expert guidance, advanced facilities and a supportive community.",
  },
  // Placeholder — reusing the Franchise storefront photo until a dedicated
  // brand story shot is ready.
  image: { src: "/HomePage/Franchise.webp", alt: "RP8 Fitness storefront" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function OurStorySection() {
  const { eyebrow, headlineLines, description, signatureCaption, mission, image } = OUR_STORY_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-10"
        >
          <div className="max-w-sm flex-none">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-strong">
              {eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
              <span className="block">{headlineLines[0]}</span>
              <span className="block">{headlineLines[1]}</span>
              <span className="block text-accent-strong">{headlineLines[2]}</span>
            </h2>
            <p className="mt-4 font-mono text-sm leading-relaxed text-foreground">{description}</p>

            <svg viewBox="0 0 100 28" className="mt-6 h-7 w-24 text-foreground" aria-hidden>
              <path
                d="M2 20c6-14 10 12 16 0s9 12 16 0 8-16 12-4 8 10 12-2 8 6 14-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-foreground">{signatureCaption}</p>
          </div>

          <div className="relative h-[280px] w-full flex-1 overflow-hidden rounded-2xl sm:h-[340px]">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <button
              type="button"
              aria-label="Play our story video"
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-lime text-ink transition-transform hover:scale-105"
            >
              <svg width="16" height="18" viewBox="0 0 12 14" fill="currentColor">
                <path d="M0 0.5L12 7L0 13.5V0.5Z" />
              </svg>
            </button>
          </div>

          <div className="flex-none rounded-2xl border border-lime/40 bg-ink p-6 sm:w-[220px]">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-lime/50 text-lime">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <p className="mt-4 font-display text-sm font-black uppercase tracking-tight text-chalk">
              {mission.title}
            </p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-chalk">{mission.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
