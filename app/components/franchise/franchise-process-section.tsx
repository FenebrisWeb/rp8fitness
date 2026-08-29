"use client";

import { motion } from "framer-motion";
import type { ProcessStep } from "@/app/types/franchise-process";
import AnimatedWords from "@/app/components/shared/animated-words";
import { fadeUpItem, staggerContainer, staggerContainerTight, viewportOnce } from "@/app/lib/motion";

const STEPS: ProcessStep[] = [
  { id: "enquire", number: "01", title: "Enquire", description: "Share your details and get in touch with our team." },
  { id: "discuss", number: "02", title: "Discuss", description: "Our experts will understand your goals and explain the model." },
  { id: "evaluate", number: "03", title: "Evaluate", description: "We evaluate the location and feasibility together." },
  { id: "agreement", number: "04", title: "Agreement", description: "Finalize terms and complete the franchise agreement." },
  { id: "setup", number: "05", title: "Setup", description: "We handle setup, equipment, staff training & branding." },
  { id: "launch", number: "06", title: "Launch", description: "Open your RP8 Fitness and start building a strong community." },
];

const ICON_PATHS: Record<string, string> = {
  enquire: "M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.3c1.1.4 2.3.6 3.6.6a1 1 0 011 1V20a1 1 0 01-1 1C10.6 21 3 13.4 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.3 1z",
  discuss: "M4 5h16v11H8l-4 4z",
  evaluate: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3",
  agreement: "M6 3h9l5 5v13H6zM15 3v5h5M9 13h6M9 17h6",
  setup: "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1",
  launch: "M12 2c2.2 1.8 3.5 4.6 3.5 8 0 1.8-.5 3.4-1.3 4.7l-2.2 2-2.2-2A9 9 0 018.5 10c0-3.4 1.3-6.2 3.5-8zM9.5 14.5L7 17l1 3 3-1.2M14.5 14.5L17 17l-1 3-3-1.2",
};

function StepIcon({ id, className }: { id: string; className?: string }) {
  const d = ICON_PATHS[id] ?? ICON_PATHS.enquire;
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

export default function FranchiseProcessSection() {
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
            <AnimatedWords text="Our Franchise" /> <AnimatedWords text="Process" className="text-accent-strong" />
          </h2>

          <div className="mt-8 rounded-2xl border border-chalk/10 bg-ink p-6 sm:mt-10 sm:p-8">
            <motion.div
              variants={staggerContainerTight}
              className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 top-7 hidden border-t border-dashed border-chalk/20 lg:block"
              />

              {STEPS.map((step) => (
                <motion.div key={step.id} variants={fadeUpItem} className="relative flex flex-col items-center gap-2 text-center">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent-vivid/60 bg-ink text-accent-vivid">
                    <StepIcon id={step.id} className="h-5 w-5" />
                  </span>
                  <p className="font-display text-sm font-black text-accent-vivid">{step.number}</p>
                  <p className="font-mono text-xs font-bold uppercase text-chalk">{step.title}</p>
                  <p className="max-w-[160px] font-mono text-xs leading-relaxed text-chalk">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
