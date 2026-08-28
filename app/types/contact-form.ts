export interface ContactInfoItem {
  id: string;
  title: string;
  lines: string[];
  accentLine?: boolean;
}

export interface ContactFormContent {
  formHeadlineLine1: string;
  formHeadlineAccent: string;
  privacyNote: string;
  infoHeadlineLine1: string;
  infoHeadlineAccent: string;
  infoItems: ContactInfoItem[];
  followLabel: string;
}
