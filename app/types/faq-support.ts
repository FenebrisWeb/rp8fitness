export interface FaqQuickContactItem {
  id: string;
  label: string;
  value: string;
}

export interface FaqSupportContent {
  headlineLine1: string;
  headlineAccent: string;
  description: string;
  ctaLabel: string;
  quickContact: FaqQuickContactItem[];
  image: {
    src: string;
    alt: string;
  };
}
