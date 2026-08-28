export interface InvestmentItem {
  id: string;
  label: string;
  value: string;
}

export interface InvestmentContent {
  headline: string;
  headlineAccent: string;
  description: string;
  items: InvestmentItem[];
  images: {
    primary: { src: string; alt: string };
    secondaryA: { src: string; alt: string };
    secondaryB: { src: string; alt: string };
  };
}
