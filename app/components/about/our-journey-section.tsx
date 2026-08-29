"use client";

import { motion } from "framer-motion";
import type { JourneyMilestone } from "@/app/types/our-journey";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUp, fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";

const MILESTONES: JourneyMilestone[] = [
  {
    id: "2012",
    year: "2012",
    title: "The Beginning",
    description: "Started as a small gym with a big dream, to transform lives through fitness.",
  },
  {
    id: "2016",
    year: "2016",
    title: "Growing Stronger",
    description: "Expanded our space, added new zones and advanced imported equipment.",
  },
  {
    id: "2020",
    year: "2020",
    title: "Building A Community",
    description: "Crossed 5000+ members and became a fitness family that inspires.",
  },
  {
    id: "2024",
    year: "2024 & Beyond",
    title: "Our Vision Continues",
    description: "Continuously evolving, expanding and raising the bar for fitness.",
  },
];

const ICON_PATHS: Record<string, string> = {
  "2012": "M5 21V4M5 4h11l-2.5 3.5L16 11H5",
  "2016": "M4 20h16M7 20v-5M12 20v-9M17 20v-3",
  "2020": "M8.5 8a2.6 2.6 0 100 5.2A2.6 2.6 0 008.5 8zM15.5 8a2.6 2.6 0 100 5.2A2.6 2.6 0 0015.5 8zM3 20v-1.5A5 5 0 018 13.5h.3M13 13.6a5 5 0 015.8 4.9V20",
  "2024": "M12 2c2.2 1.8 3.5 4.6 3.5 8 0 1.8-.5 3.4-1.3 4.7l-2.2 2-2.2-2A9 9 0 018.5 10c0-3.4 1.3-6.2 3.5-8zM9.5 14.5L7 17l1 3 3-1.2M14.5 14.5L17 17l-1 3-3-1.2",
};

function MilestoneIcon({ id, className }: { id: string; className?: string }) {
  const d = ICON_PATHS[id] ?? ICON_PATHS["2012"];
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

export default function OurJourneySection() {
  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
            <AnimatedWords text="Our Journey" />
          </h2>

          <motion.div
            variants={fadeUp}
            className="mt-8 rounded-2xl border border-chalk/10 bg-ink p-6 sm:mt-10 sm:p-8"
          >
            <motion.div
              variants={staggerContainerTight}
              className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4"
            >
              <span aria-hidden className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-chalk/15 sm:block" />

              {MILESTONES.map((milestone) => (
                <motion.div
                  key={milestone.id}
                  variants={fadeUpItem}
                  className="relative flex flex-col items-center gap-2 text-center"
                >
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent-vivid/60 bg-ink text-accent-vivid">
                    <MilestoneIcon id={milestone.id} className="h-5 w-5" />
                  </span>
                  <p className="font-display text-sm font-black uppercase text-accent-vivid">{milestone.year}</p>
                  <p className="font-mono text-xs font-bold uppercase text-chalk">{milestone.title}</p>
                  <p className="max-w-[180px] font-mono text-xs leading-relaxed text-chalk">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
