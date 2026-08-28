export interface TransformationHubFeature {
  id: string;
  label: string;
  description: string;
}

export interface TransformationHubContent {
  eyebrow: string;
  headlineLine1: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter: string;
  features: TransformationHubFeature[];
  video: { src: string; alt: string };
}
