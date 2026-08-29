"use client";

import { motion } from "framer-motion";
import type { StatBarItem } from "@/app/types/stats-bar";
import { fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";

const STATS: StatBarItem[] = [
  { id: "zones", value: "10+", label: "Zones" },
  { id: "area", value: "5000+", label: "Sq Ft Area" },
  { id: "machines", value: "Imported", label: "German Tech Machines" },
  { id: "members", value: "10K+", label: "Active Members" },
  { id: "experience", value: "12+", label: "Years Of Experience" },
  { id: "trainers", value: "50+", label: "Expert Trainers" },
];

const ICON_PATHS: Record<string, string> = {
  zones: "M4 21h16M5 21V11l7-6 7 6v10M9 21v-6h6v6",
  area: "M4 20h16M7 20v-6M12 20v-10M17 20v-4",
  machines: "M4 8v8M20 8v8M7 6v12M17 6v12M2 10v4M22 10v4M7 12h10",
  members: "M8 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20v-.5A5 5 0 017 14.5h1M14 8h6M17 5v6",
  experience: "M12 2l7 3.5v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9v-6L12 2zM9.3 11.6l1.9 1.9 3.5-3.6",
  trainers:
    "M8 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20v-.5A4 4 0 016 15.5h1a4 4 0 013.5 2M13.5 17.5A4 4 0 0117 15.5h1a4 4 0 014 4v.5",
};

function StatIcon({ id, className }: { id: string; className?: string }) {
  const d = ICON_PATHS[id] ?? ICON_PATHS.zones;
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

export default function StatsBarSection() {
  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="rounded-2xl border border-chalk/10 bg-ink px-6 py-8 sm:rounded-3xl sm:px-10"
        >
          <motion.div
            variants={staggerContainerTight}
            className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:flex lg:divide-x lg:divide-chalk/10"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.id}
                variants={fadeUpItem}
                className="flex flex-col items-center gap-2 text-center lg:flex-1 lg:px-4"
              >
                <StatIcon id={stat.id} className="h-6 w-6 text-accent-vivid" />
                <p className="font-display text-lg font-black uppercase leading-tight text-chalk sm:text-xl">
                  {stat.value}
                </p>
                <p className="max-w-[110px] font-mono text-[10px] uppercase leading-snug tracking-wide text-chalk">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
