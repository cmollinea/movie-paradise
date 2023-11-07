import { Suspense } from 'react';
import { MovieResponse } from '../../types/movie-response-interface';
import { TvShowsResponse } from '../../types/tvshows-response-interface';
import { MoviesContainer, TvShowsContainer } from './components/home';
import { MOVIES_ENPOINTS, TV_SHOWS_ENDPOINTS } from './constants/api-endpoints';
import { queryTMDB } from './services/queryTMDB';

export default async function Home() {
  const tvShowsOnAirResponse = await queryTMDB<TvShowsResponse>(
    TV_SHOWS_ENDPOINTS.AIRING_TODAY
  );
  const topRatedTvShowsResponse = queryTMDB<TvShowsResponse>(
    TV_SHOWS_ENDPOINTS.TOP_RATED
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
      <section className='overflow-hidden container px-4 lg:px-20 py-10 relative'>
        <h2>Airing Today</h2>
        <TvShowsContainer promise={tvShowsOnAirResponse} />
      </section>
      <section className='overflow-hidden container px-4 lg:px-20 py-10 relative'>
        <h2>Top Rated Tv Shows</h2>
        <Suspense fallback={<p>Loadig...</p>}>
          <TvShowsContainer promise={topRatedTvShowsResponse} />
        </Suspense>
      </section>
      <section className='overflow-hidden container px-4 lg:px-20 py-10 relative'>
        <h2>Upcoming Movies</h2>
        <Suspense fallback={<p>Loadig...</p>}>
          {' '}
          <MoviesContainer promise={upcomingMoviesResponse} />
        </Suspense>
      </section>
      <section className='overflow-hidden container px-4 lg:px-20 py-10 relative'>
        <h2>Top Rated Movies</h2>
        <Suspense fallback={<p>Loadig...</p>}>
          {' '}
          <MoviesContainer promise={topRatedMoviesResponse} />
        </Suspense>
      </section>
    </>
  );
}
