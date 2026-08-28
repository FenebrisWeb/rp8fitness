"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { AboutContent } from "@/app/types/about";
import Counter from "./counter";

const ABOUT_CONTENT: AboutContent = {
  headline:
    "Professional coaching, advanced equipment, and a motivating fitness environment built for real and lasting progress impact",
  cardLabel: "Where strength meets discipline",
  images: {
    primary: { src: "/HomePage/about/image-1.jpg", alt: "RP8 Fitness trainer" },
    secondary: { src: "/HomePage/about/image-2.jpg", alt: "Member training at RP8 Fitness" },
  },
  avatars: [
    { initials: "A", color: "bg-p25" },
    { initials: "J", color: "bg-p20" },
    { initials: "M", color: "bg-p15" },
  ],
  ratingValue: 20,
  ratingSuffix: "k+",
  ratingLabel: "Rated by members",
  stats: [
    { value: 12, suffix: "+", label: "Years Of Experience" },
    { value: 10, suffix: "k+", label: "Active Members" },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  const { headline, cardLabel, images, avatars, ratingValue, ratingSuffix, ratingLabel, stats } =
    ABOUT_CONTENT;

  return (
    <motion.section
      className="relative overflow-hidden py-20 sm:py-28"
      initial="hidden"
      animate="show"
      variants={fadeUp}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex w-full max-w-[1700px] flex-col items-center px-6 text-center sm:px-10">
        <h2 className="max-w-3xl font-display font-medium uppercase leading-snug tracking-tight text-foreground text-xl sm:text-2xl md:text-3xl">
          {headline}
        </h2>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-10 sm:mt-16 lg:flex-nowrap lg:gap-16">
          {/* Media cluster — a touch-swipeable, snap-scrolling slider on
              mobile (the three panels are wider than a phone screen
              combined); a static row from sm up. */}
          <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory items-stretch gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0">
            <span
              aria-hidden
              className="mt-1 hidden h-3 w-3 flex-none rounded-full border border-accent-strong sm:block"
            />

            <div className="relative h-[230px] w-[160px] flex-none snap-center overflow-hidden rounded-xl sm:w-[190px]">
              <Image
                src={images.primary.src}
                alt={images.primary.alt}
                fill
                sizes="190px"
                className="object-cover"
              />
            </div>

            <div className="flex h-[230px] w-[150px] flex-none snap-center flex-col justify-between rounded-xl bg-ink p-4 sm:w-[170px]">
              <motion.p
                className="text-left font-mono text-sm font-semibold leading-snug"
                initial={{ color: "#7c848d" }}
                whileInView={{ color: "#f3f2ec" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {cardLabel}
              </motion.p>
              <button
                type="button"
                aria-label="Play video"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-vivid text-accent-vivid-contrast transition-transform hover:scale-105"
              >
                <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                  <path d="M0 0.5L12 7L0 13.5V0.5Z" />
                </svg>
              </button>
            </div>

            <div className="relative h-[230px] w-[160px] flex-none snap-center overflow-hidden rounded-xl sm:w-[190px]">
              <Image
                src={images.secondary.src}
                alt={images.secondary.alt}
                fill
                sizes="190px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Stats column — vertically centered against the media cluster
              beside it. */}
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-center lg:flex-col lg:items-start lg:gap-10">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {avatars.map((avatar) => (
                  <span
                    key={avatar.initials}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink font-mono text-[11px] font-bold text-ink ${avatar.color}`}
                  >
                    {avatar.initials}
                  </span>
                ))}
              </div>
              <div className="text-left">
                <p className="font-display text-lg font-black text-foreground">
                  <Counter value={ratingValue} suffix={ratingSuffix} />
                </p>
                <p className="font-mono text-xs text-foreground">{ratingLabel}</p>
              </div>
            </div>

            <div className="flex divide-x divide-foreground/10">
              {stats.map((stat) => (
                <div key={stat.label} className="px-6 text-left first:pl-0">
                  <p className="font-display text-3xl font-black text-foreground sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 font-mono text-xs text-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
