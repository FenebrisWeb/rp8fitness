"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { MembershipContent } from "@/app/types/membership";

const MEMBERSHIP_CONTENT: MembershipContent = {
  headlineAccent: "Flexible",
  headlineRest: "Plans For Every Goal",
  description: "Whether you're just getting started or aiming higher, we have the right plan for you.",
  ctaLabel: "View Membership",
  image: { src: "/HomePage/plans.webp", alt: "Member training at RP8 Fitness" },
  pointers: [
    { id: "personalized", label: "Personalized Plans" },
    { id: "guidance", label: "Expert Guidance" },
    { id: "group", label: "Group Classes" },
    { id: "pricing", label: "Affordable Pricing" },
  ],
  price: {
    eyebrow: "Starting At",
    amount: "₹999",
    period: "/Month",
    notes: ["No Hidden Costs", "Cancel Anytime"],
  },
};

// Four small one-off icons for the pointer list — an id card for
// personalized plans, a compass for guidance, a group for classes, a coin
// for pricing — styled to match HighlightIcon's single-tone lime system.
const POINTER_ICONS: Record<string, string> = {
  personalized: "M4 5h16v14H4zM8 12a2 2 0 100-4 2 2 0 000 4zM6 17c0-1.7 1.3-3 3-3s3 1.3 3 3M14 9h4M14 13h4",
  guidance: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 7l2 5-2 5-2-5z",
  group: "M8 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20v-.5A4 4 0 016 15.5h1a4 4 0 013.5 2M13.5 17.5A4 4 0 0117 15.5h1a4 4 0 014 4v.5",
  pricing: "M12 2a10 10 0 100 20 10 10 0 000-20zM9.5 9.3c0-1 1-1.8 2.5-1.8s2.5.7 2.5 1.4-1 1.1-2.5 1.4-2.5.9-2.5 1.9 1 1.7 2.5 1.7 2.5-.7 2.5-1.4M12 6v1.3M12 16.7V18",
};

function PointerIcon({ id, className }: { id: string; className?: string }) {
  const d = POINTER_ICONS[id] ?? POINTER_ICONS.personalized;
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

export default function MembershipSection() {
  const { headlineAccent, headlineRest, description, ctaLabel, image, pointers, price } =
    MEMBERSHIP_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-[20px]">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate flex min-h-[460px] flex-col justify-center overflow-hidden rounded-2xl border border-chalk/10 sm:min-h-[500px] sm:rounded-3xl lg:min-h-[540px]"
        >
          {/* Full-bleed banner photo, shown as-is with no gradient layered
              on top — same treatment as the Franchise/Open Terrace banners. */}
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="-z-10 object-cover" />

          <div className="flex flex-col gap-10 p-6 sm:p-10 lg:flex-row lg:items-center lg:gap-10 lg:p-14">
            <div className="max-w-xs">
              <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-chalk sm:text-3xl">
                <span className="text-lime">{headlineAccent}</span> {headlineRest}
              </h2>
              <p className="mt-3 font-mono text-sm text-chalk">{description}</p>

              <Link
                href="#"
                className="mt-6 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-ink transition-transform hover:scale-105"
              >
                {ctaLabel}
                <span aria-hidden className="text-sm leading-none">
                  ›
                </span>
              </Link>
            </div>

            <div className="hidden h-24 w-px flex-none bg-chalk/10 lg:block" />

            <div className="flex flex-col gap-4">
              {pointers.map((pointer) => (
                <div key={pointer.id} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-md border border-lime/50 text-lime">
                    <PointerIcon id={pointer.id} className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.04em] text-chalk">
                    {pointer.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="min-w-[240px] rounded-2xl border border-lime/50 bg-black/30 px-8 py-8 text-center backdrop-blur-sm sm:px-10 sm:py-9 lg:ml-auto">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-chalk">
                {price.eyebrow}
              </p>
              <p className="mt-2 font-display text-4xl font-black text-chalk sm:text-5xl">
                {price.amount}
                <span className="text-lg font-bold text-lime sm:text-xl">{price.period}</span>
              </p>
              <div className="my-4 h-px w-full bg-lime/30" />
              <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-chalk">
                {price.notes[0]}
                <br />
                {price.notes[1]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
