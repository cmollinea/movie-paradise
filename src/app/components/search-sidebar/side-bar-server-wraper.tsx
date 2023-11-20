import { getSearchPromises } from '@/app/helpers/get-search-promises';
import { SideBar } from '.';

import type {
  CollectionResponse,
  MovieResponse,
  PeopleResponse,
  TvShowsResponse
} from 'root/types';

type Props = {
  query: string;
};

//* Este comonente es una medida para poder sacar los resultados totales para una misma query
//todo Es posible que tnga que convertir esto en un client component y usar react query y ademas ponerlo en un layout

export const SideBarServerWrapper = async ({ query }: Props) => {
  //   const [movies, tv, collections, people] = await Promise.all([
  //     getSearchPromises(query, '1', 'movies'),
  //     getSearchPromises(query, '1', 'tv'),
  //     getSearchPromises(query, '1', 'collections'),
  //     getSearchPromises(query, '1', 'people')
  //   ]);

  let totalResults = {
    movies: 0,
    tv: 0,
    people: 0,
    collections: 0
  };

  //   if (movies !== undefined && !('statusText' in movies)) {
  //     totalResults.movies = (movies as MovieResponse).total_results;
  //   }

  //   if (tv !== undefined && !('statusText' in tv)) {
  //     totalResults.tv = (tv as TvShowsResponse).total_results;
  //   }

  //   if (collections !== undefined && !('statusText' in collections)) {
  //     totalResults.collections = (
  //       collections as CollectionResponse
  //     ).total_results;
  //   }

  //   if (people !== undefined && !('statusText' in people)) {
  //     totalResults.people = (people as PeopleResponse).total_results;
  //   }

  return <SideBar totalResults={totalResults} />;
};
