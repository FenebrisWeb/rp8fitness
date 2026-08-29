"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Zone } from "@/app/types/zones";
import ZoneIcon from "./zone-icon";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";

// Demo photos for now — 1080x1080, swap for real zone photography later.
const ZONES: Zone[] = [
  {
    id: "cardio",
    title: "Cardio",
    description: "High-intensity machines",
    category: "train",
    image: "https://picsum.photos/seed/rp8-cardio/1080/1080",
  },
  {
    id: "strength",
    title: "Strength",
    description: "Free weights & racks",
    category: "train",
    image: "https://picsum.photos/seed/rp8-strength/1080/1080",
  },
  {
    id: "zumba",
    title: "Zumba Classes",
    description: "Group dance fitness",
    category: "train",
    image: "https://picsum.photos/seed/rp8-zumba/1080/1080",
  },
  {
    id: "crossfit",
    title: "CrossFit",
    description: "Functional training zone",
    category: "train",
    image: "https://picsum.photos/seed/rp8-crossfit/1080/1080",
  },
  {
    id: "boxing",
    title: "Boxing Area",
    description: "Bags, rings & pads",
    category: "train",
    image: "https://picsum.photos/seed/rp8-boxing/1080/1080",
  },
  {
    id: "pickleball",
    title: "Pickleball Court",
    description: "Open terrace court",
    category: "play",
    image: "https://picsum.photos/seed/rp8-pickleball/1080/1080",
  },
  {
    id: "pool",
    title: "Pool Table",
    description: "Unwind between sets",
    category: "play",
    image: "https://picsum.photos/seed/rp8-pool/1080/1080",
  },
  {
    id: "cafe",
    title: "Cafe",
    description: "Protein-forward menu",
    category: "support",
    image: "https://picsum.photos/seed/rp8-cafe/1080/1080",
  },
  {
    id: "supplement",
    title: "Supplement Store",
    description: "Everything you need",
    category: "support",
    image: "https://picsum.photos/seed/rp8-supplement/1080/1080",
  },
  {
    id: "closet",
    title: "Walk-in Closet",
    description: "Secure locker storage",
    category: "support",
    image: "https://picsum.photos/seed/rp8-closet/1080/1080",
  },
];

// Alternates the brand's red and the lime accent across cards, instead of
// defaulting every hover state to green.
const ACCENTS = ["red", "lime"] as const;
const ACCENT_CLASSES: Record<(typeof ACCENTS)[number], { border: string; bg: string; text: string }> = {
  red: { border: "group-hover:border-p25", bg: "group-hover:bg-p25", text: "group-hover:text-chalk" },
  lime: {
    border: "group-hover:border-accent-vivid",
    bg: "group-hover:bg-accent-vivid",
    text: "group-hover:text-accent-vivid-contrast",
  },
};

export default function ZonesSection() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
            <AnimatedWords text="Explore Our Zones" />
          </h2>

          <motion.div variants={fadeUp}>
            <Link
              href="#"
              className="group flex cursor-pointer items-center gap-2 rounded-full border border-foreground/25 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-p25 hover:text-p25 active:scale-95"
            >
              Explore All Zones
              <span aria-hidden className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainerTight}
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-3 lg:grid-cols-5"
        >
          {ZONES.map((zone, i) => {
            const accent = ACCENT_CLASSES[ACCENTS[i % ACCENTS.length]];

            return (
              <motion.div key={zone.id} variants={fadeUpItem}>
                <Link
                  href="#"
                  className="group relative flex aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl border border-chalk/10 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={zone.image}
                    alt={zone.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[9000ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />

                  {/* Content painted above the image/gradient via normal DOM
                      order — avoids the negative-z-index trick, which would
                      otherwise sink the image behind the section's own
                      background. */}
                  <div className="relative flex h-full w-full flex-col justify-between p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/40 text-chalk backdrop-blur-sm">
                      <ZoneIcon name={zone.id} className="h-4 w-4" />
                    </span>

                    <div className="pr-9">
                      <h3 className="font-display text-sm font-bold uppercase leading-tight text-chalk sm:text-base">
                        {zone.title}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] leading-snug text-steel">
                        {zone.description}
                      </p>
                    </div>
                  </div>

                  <span
                    aria-hidden
                    className={`absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-chalk/25 text-chalk transition-colors ${accent.border} ${accent.bg} ${accent.text}`}
                  >
                    ↗
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
