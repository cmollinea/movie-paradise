import { Movie } from './movie-response-interface';

export interface MovieSimilars {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
