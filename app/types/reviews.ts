export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface ReviewsContent {
  headline: string;
  ratingValue: string;
  ratingLabel: string;
  reviews: Review[];
}
