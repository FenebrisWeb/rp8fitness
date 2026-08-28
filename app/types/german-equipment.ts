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
    alt: string;
  };
  features: EquipmentFeature[];
}
