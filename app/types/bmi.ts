import type { BmiCategoryId } from "@/app/lib/bmi";

export interface BmiHeroContent {
  eyebrow: string;
  headlineLine1: string;
  headlineAccent: string;
  headlineRest: string;
  description: string;
  pointers: { id: string; title: string }[];
  image: { src: string; alt: string };
}

export interface BmiMeaningContent {
  message: string;
  benefits: [string, string, string];
}

export type BmiMeaningMap = Record<BmiCategoryId, BmiMeaningContent>;

export interface BmiCategoryGuideItem {
  id: BmiCategoryId;
  range: string;
  label: string;
  description: string;
}
