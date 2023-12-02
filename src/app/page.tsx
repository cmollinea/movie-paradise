import { Suspense } from 'react';
import { MovieResponse } from '../../types/movie-response-interface';
import { TvShowsResponse } from '../../types/tvshows-response-interface';
import { MoviesContainer, TvShowsContainer } from './components/home';
import { MOVIES_ENPOINTS, TV_SHOWS_ENDPOINTS } from './constants/api-endpoints';
import { queryTMDB } from './services/queryTMDB';
import { Title } from './components/global-ui';
import { ServerFormWrapper } from './components/search-box';

//todo Cambiar on air por trending y ademas ponerlo de principal

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

  let formBackground = [''];

  if (
    topRatedTvShowsResponse !== undefined &&
    !('statusText' in topRatedTvShowsResponse)
  ) {
    const backdropArray = topRatedTvShowsResponse.results.map(
      (item) => item.backdrop_path
    );
    formBackground = backdropArray.filter((item) => item !== null) as string[];
  }

  const backdropIndex = Math.floor(Math.random() * (formBackground.length - 1));
  console.log(backdropIndex, 'Backdrop Index');

  return (
    <>
      <ServerFormWrapper backgroundPath={formBackground[backdropIndex]} />
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
