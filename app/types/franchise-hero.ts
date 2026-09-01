export interface FranchiseHeroPointer {
  id: string;
  label: string;
}

export interface FranchiseHeroContent {
  eyebrow: string;
  headlineLine1: string;
  headlineAccent: string;
  headlineLine3: string;
  description: string;
  pointers: FranchiseHeroPointer[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  image: {
    src: string;
    mobileSrc?: string;
    alt: string;
  };
}
