"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { EndToEndSupportContent } from "@/app/types/end-to-end-support";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";

const SUPPORT_CONTENT: EndToEndSupportContent = {
  headlineLine1: "End To End",
  headlineAccent: "Support",
  items: [
    { id: "location", label: "Location Assistance" },
    { id: "layout", label: "Layout & Design Planning" },
    { id: "staff", label: "Staff Hiring & Training" },
    { id: "operations", label: "Operations Support" },
    { id: "marketing", label: "Marketing & Promotions" },
    { id: "technology", label: "Technology & Systems" },
  ],
  // Placeholder — reusing an existing training photo until dedicated
  // franchise-coaching photography is ready.
  image: { src: "/HomePage/hero-banner01.webp", alt: "Trainer coaching a member at RP8 Fitness" },
};

const ICON_PATHS: Record<string, string> = {
  location: "M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 11a2 2 0 100-4 2 2 0 000 4z",
  layout: "M4 4h16v16H4zM4 9h16M9 9v11",
  staff: "M12 7a3.2 3.2 0 100 6.4A3.2 3.2 0 0012 7zM5 21v-2.5A6.5 6.5 0 0111.5 12h1A6.5 6.5 0 0119 18.5V21",
  operations: "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1",
  marketing: "M3 11v2a2 2 0 002 2h1l3 4v-6M6 15h1l9-5V8L7 3H6a2 2 0 00-2 2v8zM18 8a3 3 0 010 6",
  technology: "M4 5h16v11H4zM9 20h6M12 16v4M8 9l2 2-2 2M13 13h3",
};

function ItemIcon({ id, className }: { id: string; className?: string }) {
  const d = ICON_PATHS[id] ?? ICON_PATHS.location;
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

export default function EndToEndSupportSection() {
  const { headlineLine1, headlineAccent, items, image } = SUPPORT_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="rounded-2xl border border-chalk/10 bg-ink p-6 sm:rounded-3xl sm:p-8 lg:p-10"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
            <motion.div
              variants={fadeUp}
              className="group relative h-[220px] w-full flex-none overflow-hidden rounded-xl lg:h-[260px] lg:w-[280px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 280px, 100vw"
                className="object-cover transition-transform duration-[9000ms] ease-out group-hover:scale-110"
              />
            </motion.div>

            <div className="flex-1 text-center lg:text-left">
              <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-chalk sm:text-3xl">
                <AnimatedWords text={headlineLine1} /> <AnimatedWords text={headlineAccent} className="text-accent-vivid" />
                <br className="hidden sm:block" /> <AnimatedWords text="At Every Step" />
              </h2>

              <motion.div
                variants={staggerContainerTight}
                className="no-scrollbar mt-6 flex snap-x snap-mandatory justify-start gap-x-8 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:gap-y-6 sm:overflow-visible sm:pb-0 lg:justify-start"
              >
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={fadeUpItem}
                    className="flex w-24 flex-none snap-start flex-col items-center gap-2 text-center sm:w-24 lg:w-auto lg:flex-row lg:text-left"
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-accent-vivid/50 text-accent-vivid">
                      <ItemIcon id={item.id} className="h-5 w-5" />
                    </span>
                    <p className="font-mono text-xs uppercase leading-snug text-chalk">{item.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
