"use client";

import { motion } from "framer-motion";
import type { BmiCategoryGuideItem } from "@/app/types/bmi";
import { BMI_CATEGORY_COLORS, type BmiCategoryId } from "@/app/lib/bmi";

const CATEGORIES: BmiCategoryGuideItem[] = [
  {
    id: "underweight",
    range: "< 18.5",
    label: "Underweight",
    description: "You may need to gain weight. Focus on a balanced diet and strength training.",
  },
  {
    id: "normal",
    range: "18.5 - 24.9",
    label: "Normal",
    description: "Great! Keep it up with regular exercise and a healthy lifestyle.",
  },
  {
    id: "overweight",
    range: "25 - 29.9",
    label: "Overweight",
    description: "You may be at increased risk. Exercise and healthy habits can help.",
  },
  {
    id: "obese",
    range: "≥ 30",
    label: "Obese",
    description: "Health risk is high. Consult a fitness expert and start your journey.",
  },
];

function BodyIcon({
  checked,
  className,
  style,
}: {
  checked?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (checked) {
    return (
      <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.5 2.5L16 9.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="5" r="2.3" />
      <path d="M12 8v7M8 11h8M9 21l3-6 3 6" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function BmiCategoryGuideSection({ activeCategory }: { activeCategory?: BmiCategoryId | null }) {
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
          <h2 className="font-display text-xl font-black uppercase tracking-tight text-foreground sm:text-2xl">
            BMI Category Guide
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category) => {
              const color = BMI_CATEGORY_COLORS[category.id];
              const active = category.id === activeCategory;
              return (
                <div
                  key={category.id}
                  className="rounded-xl border p-5"
                  style={{
                    borderColor: active ? color : "color-mix(in srgb, var(--chalk) 10%, transparent)",
                    backgroundColor: active ? `color-mix(in srgb, ${color} 12%, var(--ink))` : "var(--ink)",
                  }}
                >
                  <BodyIcon checked={active} className="h-7 w-7" style={{ color }} />
                  <p className="mt-3 font-mono text-sm font-bold" style={{ color }}>
                    {category.range}
                  </p>
                  <p className="font-display text-base font-black uppercase text-chalk">{category.label}</p>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-chalk">{category.description}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center font-mono text-xs text-foreground">
            Disclaimer: This calculator is for informational purposes only. It is not a substitute for professional medical advice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
