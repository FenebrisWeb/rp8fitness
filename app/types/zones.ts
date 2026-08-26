export type ZoneCategory = "train" | "play" | "support";

export interface Zone {
  id: string;
  title: string;
  description: string;
  category: ZoneCategory;
  image: string;
}
