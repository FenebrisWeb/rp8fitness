"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { FranchiseContent } from "@/app/types/franchise";

const FRANCHISE_CONTENT: FranchiseContent = {
  headline: "Franchise Opportunities",
  description: "Be a part of India's fastest growing fitness brand.",
  ctaLabel: "Know More",
  image: { src: "/HomePage/Franchise.webp", alt: "RP8 Fitness franchise outlet" },
  highlights: [
    { id: "area", label: "Min Area Required", value: "5000+ Sq Ft" },
    { id: "terrace", label: "Open Terrace", value: "Dedicated Outdoor Space" },
  ],
};

// Two one-off icons — a blueprint/scan mark for floor area, a rooftop
// outline for the open terrace — styled to match ZoneIcon's stroke system
// without pulling in its lookup table for just two entries.
const HIGHLIGHT_ICONS: Record<string, string> = {
  area: "M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5",
  terrace: "M4 21h16M5 21V11l7-6 7 6v10M9 21v-6h6v6",
};

function HighlightIcon({ id, className }: { id: string; className?: string }) {
  const d = HIGHLIGHT_ICONS[id] ?? HIGHLIGHT_ICONS.area;
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

export default function FranchiseSection() {
  const { headline, description, ctaLabel, image, highlights } = FRANCHISE_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate flex min-h-[460px] flex-col justify-center overflow-hidden rounded-2xl border border-chalk/10 sm:min-h-[500px] sm:rounded-3xl lg:min-h-[540px]"
        >
          {/* Full-bleed banner photo — the card's background, not a side
              panel — shown as-is, with no gradient layered on top. */}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="-z-10 object-cover"
          />

          <div className="flex flex-col gap-10 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-start lg:gap-14 lg:p-14">
            <div className="max-w-sm">
              <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-accent-vivid drop-shadow-[0_0_18px_var(--accent-vivid-glow)] sm:text-4xl">
                {headline}
              </h2>
              <p className="mt-3 font-mono text-sm text-chalk sm:text-base">{description}</p>

              <Link
                href="#"
                className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-accent-vivid/70 bg-accent-vivid/20 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk backdrop-blur-md shadow-[0_0_20px_var(--accent-vivid-glow)] transition-all hover:bg-accent-vivid/35 hover:shadow-[0_0_28px_var(--accent-vivid-glow-strong)] hover:scale-105"
              >
                {ctaLabel}
                <span aria-hidden className="text-sm leading-none">
                  ↗
                </span>
              </Link>
            </div>

            <dl className="flex flex-col gap-6">
              {highlights.map((highlight) => (
                <div key={highlight.id} className="flex items-start gap-3">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-accent-vivid/60 bg-ink/40 text-accent-vivid backdrop-blur-sm">
                    <HighlightIcon id={highlight.id} className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-chalk">
                      {highlight.label}
                    </dt>
                    <dd className="mt-0.5 max-w-[220px] font-display text-base font-bold uppercase leading-snug text-chalk sm:text-lg">
                      {highlight.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
