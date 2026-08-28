export interface ContactHeroPointer {
  id: string;
  title: string;
  description: string;
}

export interface ContactHeroContent {
  eyebrow: string;
  headlineLine1: string;
  headlineAccent: string;
  headlineRest: string;
  description: string;
  pointers: ContactHeroPointer[];
  image: {
    src: string;
    alt: string;
  };
}
