export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  billingNote: string;
  features: string[];
  ctaLabel: string;
  popular?: boolean;
}

export interface MembershipPlansContent {
  eyebrow: string;
  headline: string;
  plans: MembershipPlan[];
  footnote: string;
}
