export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalPageContent {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}
