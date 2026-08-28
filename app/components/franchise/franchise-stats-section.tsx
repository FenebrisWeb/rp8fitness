"use client";

import { motion } from "framer-motion";
import type { FranchiseStatItem } from "@/app/types/franchise-stats";

const STATS: FranchiseStatItem[] = [
  { id: "area", value: "5000+", label: "Sq Ft Min. Area" },
  { id: "terrace", value: "Open Terrace", label: "For Pickleball Court & Other Activities" },
  { id: "machines", value: "Imported", label: "German Tech Machines" },
  { id: "revenue", value: "Multiple", label: "Revenue Streams" },
  { id: "brand", value: "Strong Brand", label: "Recognition" },
];

const ICON_PATHS: Record<string, string> = {
  area: "M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5",
  terrace: "M4 21h16M5 21V11l7-6 7 6v10M9 21v-6h6v6",
  machines: "M4 8v8M20 8v8M7 6v12M17 6v12M2 10v4M22 10v4M7 12h10",
  revenue: "M4 7h16v13H4zM4 11h16M4 15h16M9 7V4h6v3",
  brand: "M12 2l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z",
};

function StatIcon({ id, className }: { id: string; className?: string }) {
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

export default function FranchiseStatsSection() {
  return (
    <section className="relative overflow-hidden bg-transparent pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-chalk/10 bg-ink px-6 py-6 sm:rounded-3xl sm:px-10 sm:py-8"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:divide-x lg:divide-chalk/10">
            {STATS.map((stat) => (
              <div key={stat.id} className="flex items-center gap-3 lg:flex-1 lg:px-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-accent-vivid/50 text-accent-vivid">
                  <StatIcon id={stat.id} className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-black uppercase leading-tight text-chalk">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 max-w-[160px] font-mono text-[10px] uppercase leading-snug tracking-wide text-chalk">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
