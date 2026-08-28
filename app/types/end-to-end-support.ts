export interface SupportItem {
  id: string;
  label: string;
}

export interface EndToEndSupportContent {
  headlineLine1: string;
  headlineAccent: string;
  items: SupportItem[];
  image: {
    src: string;
    alt: string;
  };
}
