import { SideBar } from '.';

// import type {
//   CollectionResponse,
//   MovieResponse,
//   PeopleResponse,
//   TvShowsResponse
// } from 'root/types';

type Props = {
  query: string;
};

//* Este comonente es una medida para poder sacar los resultados totales para una misma query
//todo Es posible que tnga que convertir esto en un client component y usar react query y ademas ponerlo en un layout

export const SideBarServerWrapper = async ({ query }: Props) => {
  let totalResults = {
    movies: 0,
    tv: 0,
    people: 0,
    collections: 0
  };

  return <SideBar totalResults={totalResults} />;
};
