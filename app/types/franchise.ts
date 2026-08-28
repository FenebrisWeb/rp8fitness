export interface FranchiseHighlight {
  id: string;
  label: string;
  value: string;
}

export interface FranchiseContent {
  headline: string;
  description: string;
  ctaLabel: string;
  image: {
    src: string;
    alt: string;
  };
  highlights: FranchiseHighlight[];
}
