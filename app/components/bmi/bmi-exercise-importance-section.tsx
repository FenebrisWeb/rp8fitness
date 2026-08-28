"use client";

import { motion } from "framer-motion";
import DragScrollRow from "@/app/components/shared/drag-scroll-row";

const ITEMS = [
  { id: "weight", title: "Controls Weight", description: "Helps you maintain a healthy body weight & BMI." },
  { id: "heart", title: "Stronger Heart", description: "Reduces risk of heart disease and improves cardiovascular health." },
  { id: "energy", title: "More Energy", description: "Boosts your stamina and helps you stay active all day." },
  { id: "mental", title: "Better Mental Health", description: "Reduces stress, anxiety and improves your mood & sleep." },
  { id: "confidence", title: "Builds Confidence", description: "Improves body image and helps you feel strong inside out." },
  { id: "life", title: "Longer Life", description: "Regular exercise can add years to your life and life to your years." },
];

const ICON_PATHS: Record<string, string> = {
  weight: "M12 7a3.2 3.2 0 100 6.4A3.2 3.2 0 0012 7zM5 21v-2.5A6.5 6.5 0 0111.5 12h1A6.5 6.5 0 0119 18.5V21",
  heart: "M20.8 8.6a5.6 5.6 0 00-9.6-4 5.6 5.6 0 00-9.6 4c0 3.2 3.2 6 9.6 11.4 6.4-5.4 9.6-8.2 9.6-11.4z",
  energy: "M13 3 4 14h6l-1 7 9-11h-6l1-7z",
  mental: "M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 8v5M12 16h.01",
  confidence: "M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z",
  life: "M12 2c2.2 1.8 3.5 4.6 3.5 8 0 1.8-.5 3.4-1.3 4.7l-2.2 2-2.2-2A9 9 0 018.5 10c0-3.4 1.3-6.2 3.5-8z",
};

function ItemIcon({ id, className }: { id: string; className?: string }) {
  const d = ICON_PATHS[id] ?? ICON_PATHS.weight;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function BmiExerciseImportanceSection() {
  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-chalk/10 bg-ink p-6 sm:rounded-3xl sm:p-8"
        >
          <h2 className="font-display text-xl font-black uppercase tracking-tight text-chalk sm:text-2xl">
            Why Exercise Is <span className="text-accent-vivid">Important</span> (No Matter Your BMI)
          </h2>

          {/* Six items is cramped in 2 mobile columns without shrinking the
              type — a drag/swipe row reads better below sm, where there's
              enough room for the grid instead. */}
          <DragScrollRow className="mt-6 gap-4 sm:hidden">
            {ITEMS.map((item) => (
              <div key={item.id} className="w-[160px] flex-none rounded-xl border border-chalk/10 bg-black/20 p-4 text-center">
                <ItemIcon id={item.id} className="mx-auto h-7 w-7 text-accent-vivid" />
                <p className="mt-2 font-mono text-sm font-bold text-chalk">{item.title}</p>
                <p className="mt-1 font-mono text-sm leading-snug text-chalk">{item.description}</p>
              </div>
            ))}
          </DragScrollRow>

          <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-3">
            {ITEMS.map((item) => (
              <div key={item.id} className="rounded-xl border border-chalk/10 bg-black/20 p-5 text-center">
                <ItemIcon id={item.id} className="mx-auto h-7 w-7 text-accent-vivid" />
                <p className="mt-2 font-mono text-sm font-bold text-chalk">{item.title}</p>
                <p className="mt-1 font-mono text-sm leading-snug text-chalk">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
