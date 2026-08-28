"use client";

import { useState } from "react";
import BmiHeroSection from "./bmi-hero-section";
import BmiCalculatorSection from "./bmi-calculator-section";
import BmiExerciseImportanceSection from "./bmi-exercise-importance-section";
import BmiNextStepCtaSection from "./bmi-next-step-cta-section";
import BmiCategoryGuideSection from "./bmi-category-guide-section";
import BmiFinalCtaSection from "./bmi-final-cta-section";
import type { BmiCategoryId } from "@/app/lib/bmi";

// A thin client wrapper so the calculator's result can highlight the
// matching card in the category guide further down the page — the two
// are separate components, but the computed category needs to live above
// both.
export default function BmiPageContent() {
  const [category, setCategory] = useState<BmiCategoryId | null>(null);

  return (
    <>
      <BmiHeroSection />
      <BmiCalculatorSection onResult={setCategory} />
      <BmiExerciseImportanceSection />
      <BmiNextStepCtaSection />
      <BmiCategoryGuideSection activeCategory={category} />
      <BmiFinalCtaSection />
    </>
  );
}
