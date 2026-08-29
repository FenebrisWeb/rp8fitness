"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";
import type { ContactHeroContent } from "@/app/types/contact-hero";

const CONTACT_HERO_CONTENT: ContactHeroContent = {
  eyebrow: "We're Here To Help",
  headlineLine1: "Let's Build A",
  headlineAccent: "Stronger",
  headlineRest: "You",
  description: "Have a question, need more information, or ready to get started? Reach out to us and we'll get back to you soon.",
  pointers: [
    { id: "response", title: "Quick Response", description: "We reply within 24 hours" },
    { id: "support", title: "Expert Support", description: "Get help from our fitness experts" },
    { id: "visit", title: "Visit Us", description: "Come by and see the vibe" },
  ],
  // Placeholder — reusing an existing gym photo (already dark on the left,
  // shown as-is with no gradient) until dedicated contact page
  // photography is ready.
  image: { src: "/HomePage/plans.webp", alt: "RP8 Fitness training floor" },
};

const ICON_PATHS: Record<string, string> = {
  response: "M4 4h16v12H4zM4 6l8 6 8-6M12 20v-2",
  support: "M4 13a8 8 0 1116 0M4 13v4a2 2 0 002 2h1v-6H5a1 1 0 00-1 1zM20 13v4a2 2 0 01-2 2h-1v-6h1a1 1 0 011 1z",
  visit: "M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 11a2 2 0 100-4 2 2 0 000 4z",
};

function PointerIcon({ id, className }: { id: string; className?: string }) {
  const d = ICON_PATHS[id] ?? ICON_PATHS.response;
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

export default function ContactHeroSection() {
  const { eyebrow, headlineLine1, headlineAccent, headlineRest, description, pointers, image } =
    CONTACT_HERO_CONTENT;

  return (
    <section className="relative w-full">
      {/* Full-bleed banner photo — same treatment as Home/Franchise: shown
          as-is, content overlaid on its own naturally dark left side, no
          gradient layered on top. */}
      <div className="group relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[1920/750]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          quality={85}
          priority
          className="object-cover transition-transform duration-[9000ms] ease-out group-hover:scale-105"
        />
      </div>

      <div className="relative bg-ink px-5 py-8 sm:px-10 sm:py-10 md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:bg-transparent md:px-0 md:py-0 md:pointer-events-none">
        <div className="mx-auto w-full max-w-[1700px] md:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="max-w-lg pointer-events-auto"
          >
            <motion.span
              variants={fadeUp}
              className="block font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-vivid"
            >
              {eyebrow}
            </motion.span>

            <h1 className="mt-3 font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-chalk sm:text-5xl">
              <AnimatedWords text={headlineLine1} className="block" />
              <span className="block">
                <AnimatedWords text={headlineAccent} className="text-accent-vivid" />{" "}
                <AnimatedWords text={headlineRest} />
              </span>
            </h1>

            <motion.p variants={fadeUp} className="mt-4 max-w-md font-mono text-sm text-chalk sm:text-base">
              {description}
            </motion.p>

            <motion.div variants={staggerContainerTight} className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {pointers.map((pointer) => (
                <motion.div key={pointer.id} variants={fadeUpItem}>
                  <PointerIcon id={pointer.id} className="h-6 w-6 text-accent-vivid" />
                  <p className="mt-2 font-mono text-sm font-bold text-chalk">{pointer.title}</p>
                  <p className="mt-0.5 font-mono text-xs text-chalk">{pointer.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
