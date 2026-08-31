"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Zone } from "@/app/types/zones";
import ZoneIcon from "./zone-icon";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";
import { useEnquiryModal } from "@/app/components/layout/enquiry-modal-context";

const ZONES: Zone[] = [
  {
    id: "cardio",
    title: "Cardio",
    description: "High-intensity machines",
    category: "train",
    image: "/zones/RP8 Cardio.webp",
  },
  {
    id: "strength",
    title: "Strength",
    description: "Free weights & racks",
    category: "train",
    image: "/zones/RP8 Strength.webp",
  },
  {
    id: "zumba",
    title: "Zumba Classes",
    description: "Group dance fitness",
    category: "train",
    image: "/zones/RP8 Zumba.webp",
  },
  {
    id: "crossfit",
    title: "CrossFit",
    description: "Functional training zone",
    category: "train",
    image: "/zones/RP8 CrossFit.webp",
  },
  {
    id: "boxing",
    title: "Boxing Area",
    description: "Bags, rings & pads",
    category: "train",
    image: "/zones/RP8 Boxing Area.webp",
  },
  {
    id: "pickleball",
    title: "Pickleball Court",
    description: "Open terrace court",
    category: "play",
    image: "/zones/RP8 Pickleball.webp",
  },
  {
    id: "pool",
    title: "Pool Table",
    description: "Unwind between sets",
    category: "play",
    image: "/zones/RP8 Pool Table.webp",
  },
  {
    id: "cafe",
    title: "Cafe",
    description: "Protein-forward menu",
    category: "support",
    image: "/zones/RP8 Cafe.webp",
  },
  {
    id: "supplement",
    title: "Supplement Store",
    description: "Everything you need",
    category: "support",
    image: "/zones/RP8 Supplement.webp",
  },
  {
    id: "closet",
    title: "Walk-in Closet",
    description: "Secure locker storage",
    category: "support",
    image: "/zones/RP8 Closet.webp",
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
  const { openEnquiry } = useEnquiryModal();

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
                <button
                  type="button"
                  onClick={() => openEnquiry({ variant: "zone", context: zone.title })}
                  className="group relative flex aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-2xl border border-chalk/10 text-left transition-transform duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={zone.image}
                    alt={zone.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[9000ms] ease-out group-hover:scale-105"
                  />
                  {/* Darkens only the bottom third, behind the title/description
                      — the rest of the photo stays fully clear so the actual
                      zone photography shows through undimmed. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink from-0% via-ink/70 via-20% to-transparent to-45%" />

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
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
