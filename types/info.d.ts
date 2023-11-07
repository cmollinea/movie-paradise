import { Genre, ProductionCountry } from 'root/types/movie-details';

export interface MediaItem {
  id: number;
  overview: string;
  poster: string;
  title: string;
}

export interface Info extends MediaItem {
  country: ProductionCountry[];
  genres: Genre[];
  rating: number;
  tagline: string;
}

export type MediaType = 'tvSHow' | 'movie';
