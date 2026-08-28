"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { GermanEquipmentContent } from "@/app/types/german-equipment";

const GERMAN_EQUIPMENT_CONTENT: GermanEquipmentContent = {
  eyebrow: "Built On Quality",
  headlineLine1: "Imported German",
  headlineLine2: "Tech Machines",
  description: "Experience world class engineering for superior performance, safety and results.",
  ctaLabel: "Learn More",
  image: { src: "/HomePage/German Equipment.webp", alt: "Imported German fitness equipment at RP8 Fitness" },
  features: [
    { id: "precision", label: "Precision Engineered" },
    { id: "performance", label: "Max Performance Guaranteed" },
    { id: "ergonomic", label: "Ergonomic Design" },
    { id: "durability", label: "Long Lasting Durability" },
  ],
};

// Four one-off icons for the feature strip — a gear for precision, a
// lightning bolt for performance, a wrench for ergonomic design, a shield
// for durability — styled to match the stroke system used elsewhere
// (ZoneIcon, the Franchise section's HighlightIcon).
const FEATURE_ICONS: Record<string, string> = {
  precision:
    "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1",
  performance: "M13 3 4 14h6l-1 7 9-11h-6l1-7z",
  ergonomic:
    "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  durability: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z",
};

function FeatureIcon({ id, className }: { id: string; className?: string }) {
  const d = FEATURE_ICONS[id] ?? FEATURE_ICONS.precision;
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

export default function GermanEquipmentSection() {
  const { eyebrow, headlineLine1, headlineLine2, description, ctaLabel, image, features } =
    GERMAN_EQUIPMENT_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-20 sm:pb-28">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate flex min-h-[460px] flex-col justify-center overflow-hidden rounded-2xl border border-chalk/10 sm:min-h-[500px] sm:rounded-3xl lg:min-h-[540px]"
        >
          {/* The source photo already has its equipment on the left and a
              near-black right half, so — unlike the Franchise banner — no
              gradient overlay is layered on top; the copy sits on the
              right, over that naturally dark half. */}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="-z-10 object-cover"
          />

          <div className="flex w-full p-6 sm:justify-end sm:p-10 lg:p-14">
            <div className="flex max-w-xl flex-col gap-5 sm:gap-6">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-lime">
                {eyebrow}
              </span>

              <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight text-chalk">
                <span className="block text-3xl sm:text-4xl lg:text-5xl">{headlineLine1}</span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl">{headlineLine2}</span>
              </h2>

              <p className="max-w-md font-mono text-sm text-chalk/75 sm:text-base">{description}</p>

              <div className="mt-2 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {features.map((feature) => (
                  <div key={feature.id} className="flex flex-col gap-2">
                    <FeatureIcon id={feature.id} className="h-6 w-6 text-lime" />
                    <p className="font-mono text-xs uppercase leading-snug text-chalk/80">
                      {feature.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="#"
                className="mt-3 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-ink transition-transform hover:scale-105"
              >
                {ctaLabel}
                <span aria-hidden className="text-sm leading-none">
                  ›
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
