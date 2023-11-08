import { Suspense } from 'react';
import { MovieResponse } from '../../types/movie-response-interface';
import { TvShowsResponse } from '../../types/tvshows-response-interface';
import { MoviesContainer, TvShowsContainer } from './components/home';
import { MOVIES_ENPOINTS, TV_SHOWS_ENDPOINTS } from './constants/api-endpoints';
import { queryTMDB } from './services/queryTMDB';
import { Title } from './components/global-ui';

export default async function Home() {
  const topRatedTvShowsResponse = await queryTMDB<TvShowsResponse>(
    TV_SHOWS_ENDPOINTS.TOP_RATED
  );

  const tvShowsOnAirResponse = queryTMDB<TvShowsResponse>(
    TV_SHOWS_ENDPOINTS.AIRING_TODAY
  );

  const upcomingMoviesResponse = queryTMDB<MovieResponse>(
    MOVIES_ENPOINTS.UPCOMING
  );
  const topRatedMoviesResponse = queryTMDB<MovieResponse>(
    MOVIES_ENPOINTS.TOP_RATED
  );

  return (
    <>
      {/* AQUI DEBE IR UN FORM PARA BUSQUEDA */}
      <section className='overflow-hidden container px-4 lg:px-20 py-10 relative space-y-5'>
        <Title>Top Rated Tv Shows</Title>
        <TvShowsContainer promise={topRatedTvShowsResponse} />
      </section>
      <section className='overflow-hidden container px-4 lg:px-20 py-10 relative'>
        <Title>Airing Today</Title>
        <Suspense fallback={<p>Loadig...</p>}>
          <TvShowsContainer promise={tvShowsOnAirResponse} />
        </Suspense>
      </section>
      <section className='overflow-hidden container px-4 lg:px-20 py-10 relative space-y-5'>
        <Title>Upcoming Movies</Title>
        <Suspense fallback={<p>Loadig...</p>}>
          {' '}
          <MoviesContainer promise={upcomingMoviesResponse} />
        </Suspense>
      </section>
      <section className='overflow-hidden container px-4 lg:px-20 py-10 relative space-y-5'>
        <Title>Top Rated Movies</Title>
        <Suspense fallback={<p>Loadig...</p>}>
          {' '}
          <MoviesContainer promise={topRatedMoviesResponse} />
        </Suspense>
      </section>
    </>
  );
}
