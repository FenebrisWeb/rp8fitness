"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { InvestmentContent } from "@/app/types/investment";

const INVESTMENT_CONTENT: InvestmentContent = {
  headline: "Investment",
  headlineAccent: "Requirements",
  description: "Start your RP8 Fitness with an investment that delivers maximum returns and long-term success.",
  items: [
    { id: "area", label: "Min. Area Required", value: "5000+ Sq Ft" },
    { id: "terrace", label: "Open Terrace", value: "For Pickleball Court and Other Activities" },
    { id: "locations", label: "Ideal Locations", value: "High Streets, Commercial Hubs, Residential Catchments" },
    { id: "range", label: "Investment Range", value: "Contact our franchise team for detailed investment plan" },
  ],
  // Placeholders — reusing existing gym/facility photos until dedicated
  // franchise-unit photography is ready.
  images: {
    primary: { src: "/HomePage/German Equipment.webp", alt: "RP8 Fitness equipment floor" },
    secondaryA: { src: "/HomePage/plans.webp", alt: "RP8 Fitness training area" },
    secondaryB: { src: "/HomePage/Rooftop Pickleball.webp", alt: "RP8 Fitness rooftop pickleball court" },
  },
};

const ICON_PATHS: Record<string, string> = {
  area: "M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5",
  terrace: "M4 21h16M5 21V11l7-6 7 6v10M9 21v-6h6v6",
  locations: "M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 11a2 2 0 100-4 2 2 0 000 4z",
  range: "M12 2a10 10 0 100 20 10 10 0 000-20zM9.5 9.3c0-1 1-1.8 2.5-1.8s2.5.7 2.5 1.4-1 1.1-2.5 1.4-2.5.9-2.5 1.9 1 1.7 2.5 1.7 2.5-.7 2.5-1.4M12 6v1.3M12 16.7V18",
};

function ItemIcon({ id, className }: { id: string; className?: string }) {
  const d = ICON_PATHS[id] ?? ICON_PATHS.area;
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

export default function InvestmentSection() {
  const { headline, headlineAccent, description, items, images } = INVESTMENT_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-chalk/10 bg-ink p-6 sm:rounded-3xl sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-8">
            <div>
              <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-chalk sm:text-3xl">
                {headline}
                <br />
                <span className="text-accent-vivid">{headlineAccent}</span>
              </h2>
              <span aria-hidden className="mt-2 block h-1 w-10 rounded-full bg-accent-vivid" />
              <p className="mt-4 max-w-xs font-mono text-sm text-chalk">{description}</p>
            </div>

            <dl className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-accent-vivid/50 text-accent-vivid">
                    <ItemIcon id={item.id} className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-chalk/80">
                      {item.label}
                    </dt>
                    <dd className="mt-0.5 max-w-[260px] font-mono text-sm font-bold text-chalk">
                      {item.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="grid h-[320px] grid-rows-[1.4fr_1fr] gap-3 sm:h-[420px]">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={images.primary.src}
                  alt={images.primary.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={images.secondaryA.src}
                    alt={images.secondaryA.alt}
                    fill
                    sizes="(min-width: 1024px) 15vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={images.secondaryB.src}
                    alt={images.secondaryB.alt}
                    fill
                    sizes="(min-width: 1024px) 15vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
