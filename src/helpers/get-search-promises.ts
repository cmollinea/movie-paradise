import { SEARCH_ENDPOINTS } from '@/constants/api-endpoints';
import { ApiError, queryTMDB } from '@/services';
import {
  CollectionResponse,
  PeopleResponse,
  TvShowsResponse
} from 'root/types';
import { MovieResponse } from 'root/types/movie-response-interface';
import { Target } from '../components/search-sidebar/target-button';

type SearchPromises =
  | Promise<ApiError | MovieResponse | undefined>
  | Promise<ApiError | TvShowsResponse | undefined>
  | Promise<ApiError | CollectionResponse | undefined>
  | Promise<ApiError | PeopleResponse | undefined>;

/**
 * Realiza una búsqueda en la API de TMDB y devuelve una promesa con los resultados.
 *
 * @param {string} query - El término de búsqueda.
 * @param {string} page - El número de página de los resultados.
 * @param {('movies' | 'tv' | 'collections' | 'people')} target - El tipo de recurso a buscar.
 * @returns {Promise} - Una promesa que se resuelve con los resultados de la búsqueda.
 *
 * @throws {ApiError} - Si la respuesta de la API no es correcta, se devuelve un objeto de error.
 * @throws {undefined} - Si ocurre un error durante la solicitud, se devuelve undefined.
 */

export const getSearchPromises = (
  query: string,
  page: string,
  target: Target
): SearchPromises => {
  const searchParams = `?page=${page}&query=${query}`;

  if (target === 'movies') {
    const movieSearch = queryTMDB<MovieResponse>(
      SEARCH_ENDPOINTS.MOVIES + searchParams
    );
    return movieSearch;
  }

  if (target === 'tv') {
    const tv = queryTMDB<TvShowsResponse>(SEARCH_ENDPOINTS.TV + searchParams);
    return tv;
  }

  if (target === 'collections') {
    const collectionSearch = queryTMDB<CollectionResponse>(
      SEARCH_ENDPOINTS.COLLECTIONS + searchParams
    );
    return collectionSearch;
  }

  const peopleSearch = queryTMDB<PeopleResponse>(
    SEARCH_ENDPOINTS.PEOPLE + searchParams
  );
  return peopleSearch;
};
