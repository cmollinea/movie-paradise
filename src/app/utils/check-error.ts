import { MovieResponse } from '../../../types/movie-response-interface';
import { TvShowsResponse } from '../../../types/tvshows-response-interface';
import { ApiError } from '../services/queryTMDB';

export const checkError = (
  response: TvShowsResponse | MovieResponse | ApiError | undefined
): response is ApiError => {
  return (response as ApiError).status !== undefined;
};
