"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { FranchiseHeroContent } from "@/app/types/franchise-hero";

const FRANCHISE_HERO_CONTENT: FranchiseHeroContent = {
  eyebrow: "Franchise Opportunities",
  headlineLine1: "Be A Part Of India's",
  headlineAccent: "Fastest Growing",
  headlineLine3: "Fitness Brand",
  description: "Own an RP8 Fitness and build a profitable, future-ready business that transforms lives and your community.",
  pointers: [
    { id: "model", label: "Proven Business Model" },
    { id: "roi", label: "High ROI & Quick Break-Even" },
    { id: "support", label: "End To End Support" },
  ],
  primaryCtaLabel: "Get Franchise Info",
  secondaryCtaLabel: "Watch Franchise Video",
  image: { src: "/HomePage/Franchise.webp", alt: "RP8 Fitness franchise outlet" },
};

const POINTER_ICONS: Record<string, string> = {
  model: "M4 7h16v13H4zM8 7V4h8v3M4 12h16",
  roi: "M4 20h16M7 20v-6M12 20v-10M17 20v-4M6 12l4-4 3 3 5-5",
  support: "M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3zM8.7 12.2l2.3 2.3 4.3-4.5",
};

function PointerIcon({ id, className }: { id: string; className?: string }) {
  const d = POINTER_ICONS[id] ?? POINTER_ICONS.model;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function FranchiseHeroSection() {
  const {
    eyebrow,
    headlineLine1,
    headlineAccent,
    headlineLine3,
    description,
    pointers,
    primaryCtaLabel,
    secondaryCtaLabel,
    image,
  } = FRANCHISE_HERO_CONTENT;

  return (
    <section className="relative w-full">
      {/* The photo already vignettes dark on the left, opening up to the
          lit storefront on the right — same treatment as the homepage
          Franchise banner, shown as-is with no gradient layered on top. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[1920/750]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          quality={85}
          priority
          className="object-cover"
        />
      </div>

      <div className="relative bg-ink px-5 py-8 sm:px-10 sm:py-10 md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:bg-transparent md:px-0 md:py-0">
        <div className="mx-auto w-full max-w-[1700px] md:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-vivid">
                {eyebrow}
              </span>
              <span aria-hidden className="text-accent-vivid">
                ›
              </span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-black uppercase leading-[1.05] tracking-tight text-chalk sm:text-4xl md:text-5xl">
              <span className="block">{headlineLine1}</span>
              <span className="block text-accent-vivid">{headlineAccent}</span>
              <span className="block">{headlineLine3}</span>
            </h1>

            <p className="mt-4 max-w-md font-mono text-sm text-chalk sm:text-base">{description}</p>

            <dl className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
              {pointers.map((pointer) => (
                <div key={pointer.id} className="flex items-center gap-2.5">
                  <PointerIcon id={pointer.id} className="h-5 w-5 flex-none text-accent-vivid" />
                  <dt className="font-mono text-xs font-bold uppercase tracking-[0.04em] text-chalk">
                    {pointer.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent-vivid px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-transform hover:scale-105"
              >
                {primaryCtaLabel}
                <span aria-hidden className="text-sm leading-none">
                  ›
                </span>
              </Link>

              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-chalk/25 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk backdrop-blur-sm transition-colors hover:border-accent-vivid hover:text-accent-vivid"
              >
                <svg viewBox="0 0 12 14" className="h-3 w-3" fill="currentColor" aria-hidden>
                  <path d="M0 0.5L12 7L0 13.5V0.5Z" />
                </svg>
                {secondaryCtaLabel}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
