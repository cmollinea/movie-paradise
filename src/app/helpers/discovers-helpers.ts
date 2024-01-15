import type { Filters } from 'root/types/discover-types';
import {
  DISCOVER_MOVIE_ENDPOINT,
  DISCOVER_TV_ENDPOINT
} from '../constants/discover';

type Media = 'tv' | 'movie';

export function getGenresEndpoint(media: Media) {
  return `https://api.themoviedb.org/3/genre/${media}/list`;
}

export function getDiscoverUrlWithQueryParams(media: Media, filters: Filters) {
  const BASE_URL = new URL(
    media === 'movie' ? DISCOVER_MOVIE_ENDPOINT : DISCOVER_TV_ENDPOINT
  );
  const searchParams = new URLSearchParams(BASE_URL.searchParams);
  Object.entries(filters).forEach(([key, value]) => {
    searchParams.set(key, value.toString());
  });

  return (
    'https://' +
    BASE_URL.hostname +
    BASE_URL.pathname +
    '?' +
    searchParams.toString()
  );
}
