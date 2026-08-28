export interface OpenTerracePointer {
  id: string;
  label: string;
}

export interface OpenTerraceContent {
  eyebrow: string;
  headline: string;
  description: string;
  ctaLabel: string;
  image: {
    src: string;
    alt: string;
  };
  pointers: OpenTerracePointer[];
}
