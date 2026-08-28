"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { OpenTerraceContent } from "@/app/types/open-terrace";

const OPEN_TERRACE_CONTENT: OpenTerraceContent = {
  eyebrow: "Elevate Your Game",
  headline: "Open Terrace",
  description: "Rooftop Pickleball Court and Other Activities",
  ctaLabel: "Discover More",
  image: { src: "/HomePage/Rooftop Pickleball.webp", alt: "Rooftop pickleball court at RP8 Fitness" },
  pointers: [
    { id: "court", label: "Rooftop Court" },
    { id: "lighting", label: "Floodlit Nights" },
    { id: "levels", label: "All Skill Levels" },
  ],
};

// Three one-off icons for the pointer row — a pin for the rooftop court, a
// floodlight for night play, a star for open skill levels — styled to
// match the stroke system used elsewhere (ZoneIcon, HighlightIcon,
// FeatureIcon).
const POINTER_ICONS: Record<string, string> = {
  court: "M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 11a2 2 0 100-4 2 2 0 000 4z",
  lighting: "M12 2v3M8 22h8M9 6h6l2 7H7l2-7zM10 15v4h4v-4",
  levels: "M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.9 5.8 20.3l1.6-6.8L2.2 8.9l6.9-.6L12 2z",
};

function PointerIcon({ id, className }: { id: string; className?: string }) {
  const d = POINTER_ICONS[id] ?? POINTER_ICONS.court;
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

export default function OpenTerraceSection() {
  const { eyebrow, headline, description, ctaLabel, image, pointers } = OPEN_TERRACE_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-5">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate flex min-h-[460px] flex-col justify-center overflow-hidden rounded-2xl border border-chalk/10 sm:min-h-[500px] sm:rounded-3xl lg:min-h-[540px]"
        >
          {/* The source photo already vignettes dark on the left and opens
              up to the court and skyline on the right — same as the
              Franchise banner, shown as-is, no gradient layered on top. */}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="-z-10 object-cover"
          />

          <div className="flex max-w-xl flex-col gap-5 p-6 sm:gap-6 sm:p-10 lg:p-14">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-lime">
              {eyebrow}
            </span>

            <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-chalk sm:text-4xl">
              {headline}
            </h2>

            <p className="max-w-md font-mono text-base text-chalk/75 sm:text-lg">{description}</p>

            <div className="mt-2 grid grid-cols-3 gap-4 sm:gap-6">
              {pointers.map((pointer) => (
                <div key={pointer.id} className="flex flex-col gap-2">
                  <PointerIcon id={pointer.id} className="h-6 w-6 text-lime" />
                  <p className="font-mono text-xs uppercase leading-snug text-chalk/80">
                    {pointer.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="#"
              className="mt-3 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-lime/70 bg-lime/20 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk backdrop-blur-md shadow-[0_0_20px_rgba(198,255,46,0.5)] transition-all hover:bg-lime/35 hover:shadow-[0_0_28px_rgba(198,255,46,0.75)] hover:scale-105"
            >
              {ctaLabel}
              <span aria-hidden className="text-sm leading-none">
                ↗
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
