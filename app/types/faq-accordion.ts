export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  items: FaqItem[];
}
