export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterContactItem {
  id: string;
  lines: string[];
}

export interface FooterContent {
  tagline: string;
  linkGroups: FooterLinkGroup[];
  contact: FooterContactItem[];
  copyright: string;
}
