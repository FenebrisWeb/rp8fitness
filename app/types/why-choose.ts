export interface WhyChooseFeature {
  id: string;
  line1: string;
  line2: string;
}

export interface WhyChooseContent {
  /** Single-line heading used above the mobile slider. */
  headline: string;
  /** Two-line heading used in the desktop card (first word of line 2 is the lime accent). */
  headlineLine1: string;
  headlineLine2: string;
  features: WhyChooseFeature[];
}
