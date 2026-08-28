"use client";

import { motion } from "framer-motion";
import DragScrollRow from "@/app/components/shared/drag-scroll-row";
import type { ComparePlansContent } from "@/app/types/compare-plans";

const COMPARE_PLANS_CONTENT: ComparePlansContent = {
  eyebrow: "Compare Plans",
  planNames: ["Basic", "Plus", "Premium", "Elite"],
  popularIndex: 2,
  rows: [
    { id: "floor", label: "Gym Floor Access", values: [true, true, true, true] },
    { id: "strength", label: "Strength Training Area", values: [false, true, true, true] },
    { id: "classes", label: "Group Classes", values: ["1 / Week", "Unlimited", "Unlimited", "Unlimited"] },
    { id: "crossfit", label: "CrossFit & Functional Zone", values: [false, false, true, true] },
    { id: "boxing", label: "Boxing Area", values: [false, false, true, true] },
    { id: "personal", label: "Personal Training", values: [false, false, false, "2 / Month"] },
    { id: "guests", label: "Guest Passes", values: [false, "2 / Month", "4 / Month", "Unlimited"] },
    { id: "body", label: "Body Composition Analysis", values: [false, true, true, true] },
    { id: "diet", label: "Diet & Workout Plan", values: [false, false, true, true] },
    { id: "priority", label: "Priority Booking", values: [false, false, false, true] },
    { id: "discounts", label: "Supplement Discounts", values: [false, false, false, true] },
  ],
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

// The table sits directly on the plain, theme-following page background
// (no bg-ink card underneath it) — so every color here reads off
// accent-strong/foreground rather than the fixed-dark-surface accent-vivid
// pair used elsewhere on this page.
function Cell({ value, highlight }: { value: boolean | string; highlight: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon className={`mx-auto h-4 w-4 text-accent-strong`} />
    ) : (
      <span className="text-foreground/40">–</span>
    );
  }
  return <span className={`font-mono text-xs ${highlight ? "font-bold text-accent-strong" : "text-foreground"}`}>{value}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function ComparePlansSection() {
  const { eyebrow, planNames, popularIndex, rows } = COMPARE_PLANS_CONTENT;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-10 bg-accent-strong/40" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-strong">
              {eyebrow}
            </span>
            <span aria-hidden className="h-px w-10 bg-accent-strong/40" />
          </div>

          {/* The table is wider than a phone screen no matter how tight the
              columns get — a drag/swipe scroller keeps every column at a
              readable width instead of shrinking the type further. */}
          <DragScrollRow className="mt-8">
            {/* w-full stretches the table to fill the section on desktop
                (no more dead space beside it); min-w keeps it wider than a
                phone screen so it still overflows into a drag-scroll there. */}
            <table className="w-full min-w-[640px] flex-none border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="border-b border-foreground/10 px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-[0.05em] text-foreground">
                    Features
                  </th>
                  {planNames.map((name, i) => (
                    <th
                      key={name}
                      className={`border-b px-4 py-3 text-center font-mono text-xs font-bold uppercase tracking-[0.05em] ${
                        i === popularIndex ? "border-accent-strong text-accent-strong" : "border-foreground/10 text-foreground"
                      }`}
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="border-b border-foreground/10 px-4 py-3 font-mono text-xs text-foreground">
                      {row.label}
                    </td>
                    {row.values.map((value, i) => (
                      <td
                        key={`${row.id}-${i}`}
                        className={`border-b px-4 py-3 text-center ${
                          i === popularIndex ? "border-accent-strong/40 bg-accent-strong/5" : "border-foreground/10"
                        }`}
                      >
                        <Cell value={value} highlight={i === popularIndex} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </DragScrollRow>
        </motion.div>
      </div>
    </section>
  );
}
