export interface MembershipPointer {
  id: string;
  label: string;
}

export interface MembershipPrice {
  eyebrow: string;
  amount: string;
  period: string;
  notes: [string, string];
}

export interface MembershipContent {
  headlineAccent: string;
  headlineRest: string;
  description: string;
  ctaLabel: string;
  image: {
    src: string;
    alt: string;
  };
  pointers: MembershipPointer[];
  price: MembershipPrice;
}
