import { TvShow } from './tvshows-response-interface';

export interface TvShowSimilar {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}
