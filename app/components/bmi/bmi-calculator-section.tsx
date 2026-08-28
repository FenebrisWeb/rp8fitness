"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DragScrollRow from "@/app/components/shared/drag-scroll-row";
import {
  BMI_BOUNDARIES,
  BMI_CATEGORY_COLORS,
  BMI_CATEGORY_LABELS,
  BMI_SCALE_MIN,
  angleForBmi,
  calculateBmi,
  getBmiCategory,
  type BmiCategoryId,
} from "@/app/lib/bmi";
import type { BmiMeaningMap } from "@/app/types/bmi";

const MEANING: BmiMeaningMap = {
  underweight: {
    message: "Your BMI suggests you're underweight. Building healthy muscle mass with a guided plan could help improve your strength and energy levels.",
    benefits: ["Builds Strength", "Boosts Immunity", "More Energy Reserves"],
  },
  normal: {
    message: "Great job! Your BMI is in the normal range. You have a healthy body weight for your height.",
    benefits: ["Lower Risk Of Heart Disease", "Better Energy & Stamina", "Stronger Immune System"],
  },
  overweight: {
    message: "Your BMI is a little above the ideal range. A structured fitness routine can help you move toward a healthier weight.",
    benefits: ["Reduced Health Risks", "Improved Mobility", "More Confidence"],
  },
  obese: {
    message: "Your BMI indicates a higher health risk. The good news is a guided fitness plan can make a real difference, starting today.",
    benefits: ["Lower Health Risks", "Expert Guidance", "Real Support"],
  },
};

const BENEFIT_ICON_PATHS = [
  "M20.8 8.6a5.6 5.6 0 00-9.6-4 5.6 5.6 0 00-9.6 4c0 3.2 3.2 6 9.6 11.4 6.4-5.4 9.6-8.2 9.6-11.4z",
  "M13 3 4 14h6l-1 7 9-11h-6l1-7z",
  "M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3zM8.7 12.2l2.3 2.3 4.3-4.5",
];

const RANGE_LABELS: { min: number; max: number; category: BmiCategoryId; label: string }[] = [
  { min: BMI_BOUNDARIES[0], max: BMI_BOUNDARIES[1], category: "underweight", label: "< 18.5" },
  { min: BMI_BOUNDARIES[1], max: BMI_BOUNDARIES[2], category: "normal", label: "18.5 - 24.9" },
  { min: BMI_BOUNDARIES[2], max: BMI_BOUNDARIES[3], category: "overweight", label: "25 - 29.9" },
  { min: BMI_BOUNDARIES[3], max: BMI_BOUNDARIES[4], category: "obese", label: "≥ 30" },
];

function toPoint(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

const GAUGE_CX = 120;
const GAUGE_CY = 120;
const GAUGE_R = 92;

function GaugeBands() {
  const bands = RANGE_LABELS;
  return (
    <>
      {bands.map((band) => {
        const start = toPoint(GAUGE_CX, GAUGE_CY, GAUGE_R, angleForBmi(band.min));
        const end = toPoint(GAUGE_CX, GAUGE_CY, GAUGE_R, angleForBmi(band.max));
        return (
          <path
            key={band.category}
            d={`M ${start.x} ${start.y} A ${GAUGE_R} ${GAUGE_R} 0 0 1 ${end.x} ${end.y}`}
            fill="none"
            stroke={BMI_CATEGORY_COLORS[band.category]}
            strokeWidth={16}
            strokeLinecap="round"
          />
        );
      })}
    </>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function BmiCalculatorSection({
  onResult,
}: {
  onResult?: (category: BmiCategoryId | null) => void;
}) {
  const [age, setAge] = useState("28");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("70");

  const [result, setResult] = useState<{ bmi: number; category: BmiCategoryId } | null>(() => {
    const bmi = calculateBmi(175, 70);
    return { bmi, category: getBmiCategory(bmi) };
  });

  // Report the initial example result to the parent after mount, rather
  // than from inside the lazy useState initializer — calling a parent's
  // setState during a child's render (even in an initializer) is unsafe.
  useEffect(() => {
    onResult?.(result?.category ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const meaning = result ? MEANING[result.category] : null;
  const needleAngle = result ? angleForBmi(result.bmi) : angleForBmi(BMI_SCALE_MIN);
  const needleTip = toPoint(GAUGE_CX, GAUGE_CY, GAUGE_R - 6, needleAngle);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const h = Number(height);
    const w = Number(weight);
    if (!h || !w) return;
    const bmi = calculateBmi(h, w);
    const category = getBmiCategory(bmi);
    setResult({ bmi, category });
    onResult?.(category);
  };

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-chalk/10 bg-ink p-6 sm:rounded-3xl sm:p-8"
        >
          <h2 className="font-display text-xl font-black uppercase tracking-tight text-chalk sm:text-2xl">
            Calculate Your BMI
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <label className="block">
              <span className="font-mono text-xs text-chalk">Age</span>
              <input
                type="number"
                min={1}
                max={120}
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Years"
                className="mt-1.5 w-full rounded-lg border border-chalk/15 bg-black/20 px-4 py-3 font-mono text-sm text-chalk placeholder:text-chalk/50 focus:border-accent-vivid focus:outline-none"
              />
            </label>

            <div>
              <span className="font-mono text-xs text-chalk">Gender</span>
              <div className="mt-1.5 flex overflow-hidden rounded-lg border border-chalk/15">
                {(["male", "female"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setGender(option)}
                    className={`flex-1 cursor-pointer py-3 font-mono text-sm font-bold uppercase transition-colors ${
                      gender === option ? "bg-accent-vivid text-accent-vivid-contrast" : "bg-black/20 text-chalk"
                    }`}
                  >
                    {option === "male" ? "Male" : "Female"}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="font-mono text-xs text-chalk">Height</span>
              <div className="relative mt-1.5">
                <input
                  type="number"
                  min={50}
                  max={250}
                  required
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full rounded-lg border border-chalk/15 bg-black/20 px-4 py-3 pr-12 font-mono text-sm text-chalk focus:border-accent-vivid focus:outline-none"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-chalk">cm</span>
              </div>
            </label>

            <label className="block">
              <span className="font-mono text-xs text-chalk">Weight</span>
              <div className="relative mt-1.5">
                <input
                  type="number"
                  min={20}
                  max={300}
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full rounded-lg border border-chalk/15 bg-black/20 px-4 py-3 pr-12 font-mono text-sm text-chalk focus:border-accent-vivid focus:outline-none"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-chalk">kg</span>
              </div>
            </label>

            <div className="flex flex-col justify-end gap-1.5">
              <button
                type="submit"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent-vivid px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent-vivid-contrast transition-transform hover:scale-105"
              >
                Calculate BMI
                <span aria-hidden className="text-sm leading-none">
                  ›
                </span>
              </button>
              <p className="text-center font-mono text-xs text-chalk sm:text-left">All fields are required</p>
            </div>
          </div>
        </motion.form>

        {result && meaning && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
          >
            <div className="rounded-2xl border border-chalk/10 bg-ink p-6 sm:rounded-3xl sm:p-8">
              <h3 className="font-display text-lg font-black uppercase tracking-tight text-chalk">Your BMI Result</h3>

              <div className="relative mx-auto mt-4 w-full max-w-[280px]">
                <svg viewBox="0 0 240 140" className="w-full">
                  <GaugeBands />
                  <line
                    x1={GAUGE_CX}
                    y1={GAUGE_CY}
                    x2={needleTip.x}
                    y2={needleTip.y}
                    stroke="var(--chalk)"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                  <circle cx={GAUGE_CX} cy={GAUGE_CY} r={6} fill="var(--chalk)" />
                </svg>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center">
                  <p className="font-display text-4xl font-black text-accent-vivid">{result.bmi.toFixed(1)}</p>
                  <p className="-mt-1 font-mono text-sm font-bold text-chalk">{BMI_CATEGORY_LABELS[result.category]}</p>
                </div>
              </div>

              <DragScrollRow className="mt-4 gap-3">
                {RANGE_LABELS.map((band) => {
                  const active = band.category === result.category;
                  return (
                    <div
                      key={band.category}
                      className={`w-[120px] flex-none rounded-md px-3 py-3 text-center ${active ? "border border-accent-vivid" : ""}`}
                    >
                      <p className="font-mono text-sm font-bold text-chalk">{band.label}</p>
                      <p className={`mt-1 font-mono text-sm uppercase ${active ? "text-accent-vivid" : "text-chalk"}`}>
                        {BMI_CATEGORY_LABELS[band.category]}
                      </p>
                    </div>
                  );
                })}
              </DragScrollRow>
            </div>

            <div className="rounded-2xl border border-chalk/10 bg-ink p-6 sm:rounded-3xl sm:p-8">
              <h3 className="font-display text-lg font-black uppercase tracking-tight text-chalk">What Does This Mean?</h3>
              <p className="mt-3 font-mono text-sm leading-relaxed text-chalk">{meaning.message}</p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {meaning.benefits.map((benefit, i) => (
                  <div key={benefit} className="rounded-xl border border-chalk/10 p-3 text-center">
                    <svg viewBox="0 0 24 24" className="mx-auto h-6 w-6 text-accent-vivid" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={BENEFIT_ICON_PATHS[i]} />
                    </svg>
                    <p className="mt-2 font-mono text-xs leading-snug text-chalk">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-l-2 border-accent-vivid pl-4">
                <span aria-hidden className="font-display text-2xl leading-none text-accent-vivid">
                  &ldquo;
                </span>
                <p className="font-mono text-sm italic leading-relaxed text-chalk">
                  Maintaining a healthy BMI today can help you live a longer, stronger and happier life.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
