import {
  CollectionResponse,
  MovieResponse,
  PeopleResponse,
  TvShowsResponse
} from 'root/types';
import { SEARCH_ENDPOINTS } from '../constants/api-endpoints';
import { queryTMDB } from '../services';

export const getSearchResults = async (query: string) => {
  console.log('Iam goint to make a fetch');

  const searchParams = `?query=${query}`;

  const [movie, tv, collection, people] = await Promise.all([
    queryTMDB<MovieResponse>(SEARCH_ENDPOINTS.MOVIES + searchParams),

    queryTMDB<TvShowsResponse>(SEARCH_ENDPOINTS.TV + searchParams),

    queryTMDB<CollectionResponse>(SEARCH_ENDPOINTS.COLLECTIONS + searchParams),

    queryTMDB<PeopleResponse>(SEARCH_ENDPOINTS.PEOPLE + searchParams)
  ]);

  return {
    movies: movie && 'results' in movie ? movie.total_results : 0,
    tv: tv && 'results' in tv ? tv.total_results : 0,
    collections:
      collection && 'results' in collection ? collection.total_results : 0,
    people: people && 'results' in people ? people.total_results : 0
  };
};
