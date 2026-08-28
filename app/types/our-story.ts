export interface OurStoryContent {
  eyebrow: string;
  headlineLines: [string, string, string];
  description: string;
  signatureCaption: string;
  mission: {
    title: string;
    description: string;
  };
  image: {
    src: string;
    alt: string;
  };
}
