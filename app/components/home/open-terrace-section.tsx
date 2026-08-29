"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { OpenTerraceContent } from "@/app/types/open-terrace";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";

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

export default function OpenTerraceSection() {
  const { eyebrow, headline, description, ctaLabel, image, pointers } = OPEN_TERRACE_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-5">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
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
            className="-z-10 object-cover animate-slow-zoom"
          />

          <div className="flex max-w-xl flex-col gap-5 p-6 sm:gap-6 sm:p-10 lg:p-14">
            <motion.span
              variants={fadeUp}
              className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-vivid"
            >
              {eyebrow}
            </motion.span>

            <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-chalk sm:text-4xl">
              <AnimatedWords text={headline} />
            </h2>

            <motion.p variants={fadeUp} className="max-w-md font-mono text-base text-chalk sm:text-lg">
              {description}
            </motion.p>

            <motion.div variants={staggerContainerTight} className="mt-2 grid grid-cols-3 gap-4 sm:gap-6">
              {pointers.map((pointer) => (
                <motion.div key={pointer.id} variants={fadeUpItem} className="flex flex-col gap-2">
                  <PointerIcon id={pointer.id} className="h-6 w-6 text-accent-vivid" />
                  <p className="font-mono text-xs uppercase leading-snug text-chalk">
                    {pointer.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                href="#"
                className="mt-3 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-accent-vivid/70 bg-accent-vivid/20 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-chalk backdrop-blur-md shadow-[0_0_20px_var(--accent-vivid-glow)] transition-all hover:bg-accent-vivid/35 hover:shadow-[0_0_28px_var(--accent-vivid-glow-strong)] hover:scale-105"
              >
                {ctaLabel}
                <span aria-hidden className="text-sm leading-none">
                  ↗
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
