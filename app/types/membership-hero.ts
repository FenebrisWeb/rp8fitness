export interface MembershipHeroFeature {
  id: string;
  label: string;
  description: string;
}

export interface MembershipHeroOffer {
  badgeLabel: string;
  line1: string;
  discount: string;
  line2: string;
  ctaLabel: string;
}

export interface MembershipHeroContent {
  eyebrow: string;
  headlineLine1: string;
  headlineAccent: string;
  description: string;
  features: MembershipHeroFeature[];
  offer: MembershipHeroOffer;
  image: { src: string; mobileSrc?: string; alt: string };
}
