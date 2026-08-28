export interface WhyPartnerCard {
  id: string;
  title: string;
  description: string;
}

export interface WhyPartnerContent {
  headlineLine1: string;
  headlineAccent: string;
  description: string;
  cards: WhyPartnerCard[];
}
