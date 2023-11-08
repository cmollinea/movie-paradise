import { Genre, ProductionCountry } from 'root/types/movie-details';

export interface MediaItem {
  id: string;
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

export type MediaType = 'tv' | 'movies';
