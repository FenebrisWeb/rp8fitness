"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import DragScrollRow from "@/app/components/shared/drag-scroll-row";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";
import type { MembershipHeroContent } from "@/app/types/membership-hero";

const MEMBERSHIP_HERO_CONTENT: MembershipHeroContent = {
  eyebrow: "Membership Plans",
  headlineLine1: "Choose Today.",
  headlineAccent: "Transform Forever.",
  description: "Flexible membership plans designed for every goal, every lifestyle and every fitness level.",
  features: [
    { id: "secure", label: "100% Secure", description: "Your data is safe with us." },
    { id: "flexible", label: "Flexible Plans", description: "Monthly, Quarterly & Annual options." },
    { id: "freeze", label: "Freeze Anytime", description: "Pause your plan when needed." },
    { id: "fee", label: "No Joining Fee", description: "Limited time offer." },
  ],
  offer: {
    badgeLabel: "Special Offer",
    line1: "Join Now & Get",
    discount: "15% OFF",
    line2: "On Annual Plans",
    ctaLabel: "Claim Offer",
  },
  image: { src: "/HomePage/plans.webp", alt: "Member training at RP8 Fitness" },
};

const FEATURE_ICONS: Record<string, string> = {
  secure: "M12 21s-7-3.5-7-9V6l7-3 7 3v6c0 5.5-7 9-7 9zM9.5 12l1.8 1.8 3.2-3.4",
  flexible: "M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5",
  freeze: "M10 8v8M14 8v8",
  fee: "M8 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20v-.5A5 5 0 017 14.5h1M14 8h6M17 5v6",
};

function FeatureIcon({ id, className }: { id: string; className?: string }) {
  const d = FEATURE_ICONS[id] ?? FEATURE_ICONS.secure;
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

export default function MembershipHeroSection() {
  const { eyebrow, headlineLine1, headlineAccent, description, features, offer, image } =
    MEMBERSHIP_HERO_CONTENT;

  return (
    <section className="relative w-full">
      {/* Full-bleed banner photo, same treatment as every other page hero
          on the site — shown as-is, content sits in an ink panel below on
          mobile and overlays it directly from md up. */}
      <div className="group relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[1920/750]">
        <Image src={image.src} alt={image.alt} fill sizes="100vw" quality={85} priority className="object-cover transition-transform duration-[9000ms] ease-out group-hover:scale-105" />
      </div>

      <div className="relative bg-ink px-5 py-8 sm:px-10 sm:py-10 md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:bg-transparent md:px-0 md:py-0 md:pointer-events-none">
        <div className="mx-auto w-full max-w-[1700px] md:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="flex flex-col gap-6 pointer-events-auto lg:flex-row lg:items-start lg:justify-between lg:gap-10"
          >
            <div className="max-w-xl">
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-vivid">
                  {eyebrow}
                </span>
                <span aria-hidden className="text-accent-vivid">
                  ›
                </span>
              </motion.div>

              <h1 className="mt-3 font-display text-3xl font-black uppercase leading-[1.05] tracking-tight text-chalk sm:text-4xl md:text-5xl">
                <AnimatedWords text={headlineLine1} className="block" />
                <AnimatedWords text={headlineAccent} className="block text-accent-vivid" />
              </h1>

              <motion.p variants={fadeUp} className="mt-4 max-w-md font-mono text-sm text-chalk sm:text-base">
                {description}
              </motion.p>

              {/* Four feature callouts — a drag/swipe row below md, where a
                  4-up grid would otherwise cramp each label+caption pair.
                  Left as plain divs (no per-item motion) so they don't
                  fight the row's own pointer-drag handling. */}
              <DragScrollRow className="mt-6 gap-4 sm:hidden">
                {features.map((feature) => (
                  <div key={feature.id} className="w-[150px] flex-none">
                    <FeatureIcon id={feature.id} className="h-6 w-6 text-accent-vivid" />
                    <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.04em] text-chalk">
                      {feature.label}
                    </p>
                    <p className="mt-1 font-mono text-xs leading-snug text-chalk/80">{feature.description}</p>
                  </div>
                ))}
              </DragScrollRow>

              <motion.div variants={staggerContainerTight} className="mt-6 hidden grid-cols-4 gap-5 sm:grid">
                {features.map((feature) => (
                  <motion.div key={feature.id} variants={fadeUpItem}>
                    <FeatureIcon id={feature.id} className="h-6 w-6 text-accent-vivid" />
                    <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.04em] text-chalk">
                      {feature.label}
                    </p>
                    <p className="mt-1 font-mono text-xs leading-snug text-chalk/80">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Offer card — floats beside the headline from lg up, sits as
                its own banner below the feature row on smaller screens. */}
            <motion.div
              variants={fadeUp}
              className="flex-none rounded-2xl border border-accent-vivid/40 bg-ink/90 p-6 text-center backdrop-blur-sm lg:w-[220px]"
            >
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-accent-vivid/50 text-accent-vivid">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="8" width="18" height="13" rx="1.5" />
                  <path d="M3 8l2.5-4h13L21 8M12 4v17M7.5 8a2.5 2.5 0 010-5c1.5 0 2.5 1 4.5 5-2 0-4.5 0-4.5-5zM16.5 8a2.5 2.5 0 000-5c-1.5 0-2.5 1-4.5 5 2 0 4.5 0 4.5-5z" />
                </svg>
              </span>
              <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-chalk">
                {offer.badgeLabel}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.05em] text-chalk">{offer.line1}</p>
              <p className="mt-1 font-display text-3xl font-black uppercase text-accent-vivid">{offer.discount}</p>
              <p className="font-mono text-xs uppercase tracking-[0.05em] text-chalk">{offer.line2}</p>

              <Link
                href="#plans"
                className="group mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full bg-accent-vivid px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-transform hover:scale-105 active:scale-95"
              >
                {offer.ctaLabel}
                <span aria-hidden className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-1">
                  ›
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
