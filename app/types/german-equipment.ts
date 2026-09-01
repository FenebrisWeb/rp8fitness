export interface EquipmentFeature {
  id: string;
  label: string;
}

export interface GermanEquipmentContent {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  ctaLabel: string;
  image: {
    src: string;
    // Optional mobile-only crop/photo — rendered below md, with `src`
    // taking over from md up. Falls back to `src` everywhere when omitted.
    mobileSrc?: string;
    alt: string;
  };
  features: EquipmentFeature[];
}
