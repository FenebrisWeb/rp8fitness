export interface WhyChooseFeature {
  id: string;
  line1: string;
  line2: string;
}

export interface WhyChooseContent {
  headline: string;
  features: WhyChooseFeature[];
}
