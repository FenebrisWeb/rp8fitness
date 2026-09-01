export interface AboutHeroContent {
  eyebrow: string;
  headlineLine1: string;
  headlineAccent: string;
  headlineRest: string;
  description: string;
  ctaLabel: string;
  image: {
    src: string;
    mobileSrc?: string;
    alt: string;
  };
}
