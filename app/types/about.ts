export interface AboutStat {
  value: number;
  suffix: string;
  label: string;
}

export interface AboutAvatar {
  initials: string;
  color: string;
}

export interface AboutContent {
  headline: string;
  cardLabel: string;
  images: {
    primary: { src: string; alt: string };
    secondary: { src: string; alt: string };
  };
  avatars: AboutAvatar[];
  ratingValue: number;
  ratingSuffix: string;
  ratingLabel: string;
  stats: AboutStat[];
}
