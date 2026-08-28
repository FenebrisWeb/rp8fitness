"use client";

import { motion } from "framer-motion";
import type { WhyPartnerContent } from "@/app/types/why-partner";

const WHY_PARTNER_CONTENT: WhyPartnerContent = {
  headlineLine1: "Why Partner With",
  headlineAccent: "RP8 Fitness?",
  description: "We provide you with everything you need to run a successful fitness business.",
  cards: [
    {
      id: "brand",
      title: "Brand Power",
      description: "Leverage the trust and reputation of a rapidly growing fitness brand.",
    },
    {
      id: "model",
      title: "Proven Model",
      description: "A tested business model with high member retention & profitability.",
    },
    {
      id: "setup",
      title: "Complete Setup",
      description: "From layout planning to equipment, we handle everything for you.",
    },
    {
      id: "marketing",
      title: "Marketing Support",
      description: "National brand campaigns & local marketing assistance.",
    },
    {
      id: "ongoing",
      title: "Ongoing Support",
      description: "Continuous operational support to help you scale and succeed.",
    },
  ],
};

const ICON_PATHS: Record<string, string> = {
  brand: "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1",
  model: "M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3zM8.7 12.2l2.3 2.3 4.3-4.5",
  setup: "M8.5 8a2.6 2.6 0 100 5.2A2.6 2.6 0 008.5 8zM15.5 8a2.6 2.6 0 100 5.2A2.6 2.6 0 0015.5 8zM3 20v-1.5A5 5 0 018 13.5h.3M13 13.6a5 5 0 015.8 4.9V20",
  marketing: "M3 11v2a2 2 0 002 2h1l3 4v-6M6 15h1l9-5V8L7 3H6a2 2 0 00-2 2v8zM18 8a3 3 0 010 6",
  ongoing: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 7l2 5-2 5-2-5z",
};

function CardIcon({ id, className }: { id: string; className?: string }) {
  const d = ICON_PATHS[id] ?? ICON_PATHS.brand;
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

export default function WhyPartnerSection() {
  const { headlineLine1, headlineAccent, description, cards } = WHY_PARTNER_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10"
        >
          <div className="max-w-xs flex-none">
            <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
              {headlineLine1}
              <br />
              <span className="text-accent-strong">{headlineAccent}</span>
            </h2>
            <span aria-hidden className="mt-2 block h-1 w-10 rounded-full bg-accent-strong" />
            <p className="mt-4 font-mono text-sm text-foreground">{description}</p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cards.map((card) => (
              <div key={card.id} className="rounded-xl border border-chalk/10 bg-ink p-5">
                <CardIcon id={card.id} className="h-7 w-7 text-accent-vivid" />
                <p className="mt-4 font-mono text-sm font-bold uppercase leading-snug text-chalk">
                  {card.title}
                </p>
                <p className="mt-2 font-mono text-xs leading-relaxed text-chalk">{card.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
