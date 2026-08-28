export type BmiCategoryId = "underweight" | "normal" | "overweight" | "obese";

export interface BmiResult {
  value: number;
  category: BmiCategoryId;
}

export function calculateBmi(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBmiCategory(bmi: number): BmiCategoryId {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

export const BMI_CATEGORY_LABELS: Record<BmiCategoryId, string> = {
  underweight: "Underweight",
  normal: "Normal",
  overweight: "Overweight",
  obese: "Obese",
};

// Reuses the site's existing brand-color tokens rather than inventing new
// ones: blue for underweight, green for normal, gold for overweight, red
// for obese.
export const BMI_CATEGORY_COLORS: Record<BmiCategoryId, string> = {
  underweight: "var(--p20)",
  normal: "var(--p10)",
  overweight: "var(--p15)",
  obese: "var(--p25)",
};

// Gauge scale bounds and the BMI value at each band boundary — shared by
// the gauge (to draw the colored arc) and the range legend beneath it.
export const BMI_SCALE_MIN = 15;
export const BMI_SCALE_MAX = 40;
export const BMI_BOUNDARIES = [15, 18.5, 25, 30, 40];

// Maps a BMI value onto the 180°→0° sweep of the semicircle gauge (180°
// is the left end of the arc at BMI_SCALE_MIN, 0° is the right end at
// BMI_SCALE_MAX).
export function angleForBmi(bmi: number): number {
  const clamped = Math.min(Math.max(bmi, BMI_SCALE_MIN), BMI_SCALE_MAX);
  return 180 - ((clamped - BMI_SCALE_MIN) / (BMI_SCALE_MAX - BMI_SCALE_MIN)) * 180;
}
