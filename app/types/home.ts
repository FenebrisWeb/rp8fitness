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
    alt: string;
  };
  stats: HeroStat[];
}
