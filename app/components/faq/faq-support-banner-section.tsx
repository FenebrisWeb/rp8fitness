"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { FaqSupportContent } from "@/app/types/faq-support";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";

const FAQ_SUPPORT_CONTENT: FaqSupportContent = {
  headlineLine1: "Still Have Questions?",
  headlineAccent: "We're Here To Help.",
  description: "Can't find the answer you're looking for? Our support team is just a message away.",
  ctaLabel: "Contact Us",
  quickContact: [
    { id: "call", label: "Call Us", value: "+91 12345 67890" },
    { id: "email", label: "Email Us", value: "info@rp8fitness.com" },
    { id: "visit", label: "Visit Our Gym", value: "123 Fitness Ave, Your City, State - 123456" },
  ],
  // Placeholder — reusing an existing training photo until dedicated FAQ
  // page photography is ready.
  image: { src: "/HomePage/about/image-1.jpg", alt: "Trainer coaching a member at RP8 Fitness" },
};

const ICON_PATHS: Record<string, string> = {
  call: "M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.3c1.1.4 2.3.6 3.6.6a1 1 0 011 1V20a1 1 0 01-1 1C10.6 21 3 13.4 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.3 1z",
  email: "M3 5h18v14H3zM3 7l9 6 9-6",
  visit: "M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 11a2 2 0 100-4 2 2 0 000 4z",
};

function QuickIcon({ id, className }: { id: string; className?: string }) {
  const d = ICON_PATHS[id] ?? ICON_PATHS.call;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

export default function FaqSupportBannerSection() {
  const { headlineLine1, headlineAccent, description, ctaLabel, quickContact, image } = FAQ_SUPPORT_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex flex-col gap-8 rounded-2xl border border-chalk/10 bg-ink p-6 sm:rounded-3xl sm:p-8 lg:flex-row lg:items-center lg:gap-10"
        >
          <motion.div variants={fadeUp} className="relative h-[200px] w-full flex-none overflow-hidden rounded-xl lg:h-[220px] lg:w-[260px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 260px, 100vw"
              className="object-cover animate-slow-zoom"
            />
          </motion.div>

          <div className="flex-1 text-center lg:text-left">
            <motion.span variants={fadeUp} className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-accent-vivid/50 text-accent-vivid lg:mx-0">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 5h16v11H8l-4 4z" />
              </svg>
            </motion.span>
            <p className="mt-3 font-display text-xl font-black uppercase tracking-tight text-chalk sm:text-2xl">
              <AnimatedWords text={headlineLine1} /> <AnimatedWords text={headlineAccent} className="text-accent-vivid" />
            </p>
            <motion.p variants={fadeUp} className="mx-auto mt-2 max-w-sm font-mono text-sm text-chalk lg:mx-0">{description}</motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="/contact"
                className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent-vivid px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-transform hover:scale-105"
              >
                {ctaLabel}
                <span aria-hidden className="text-sm leading-none">
                  ›
                </span>
              </Link>
            </motion.div>
          </div>

          <motion.div variants={staggerContainerTight} className="flex flex-none flex-col gap-4">
            {quickContact.map((item) => (
              <motion.div key={item.id} variants={fadeUpItem} className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-accent-vivid/50 text-accent-vivid">
                  <QuickIcon id={item.id} className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-chalk">{item.label}</p>
                  <p className="max-w-[220px] font-mono text-sm font-bold text-chalk">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
