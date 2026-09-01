export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HeroSlide {
  id: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  image: {
    src: string;
    // Optional mobile-only crop/photo — rendered below md, with `image.src`
    // taking over from md up. Falls back to `image.src` everywhere when
    // omitted.
    mobileSrc?: string;
    alt: string;
  };
  stats: HeroStat[];
}
