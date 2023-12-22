import { Suspense } from 'react';
import { MovieResponse } from '../../types/movie-response-interface';
import { TvShowsResponse } from '../../types/tvshows-response-interface';
import { MoviesContainer, TvShowsContainer } from './components/home';
import { MOVIES_ENPOINTS, TV_SHOWS_ENDPOINTS } from './constants/api-endpoints';
import { queryTMDB } from './services/queryTMDB';
import { Title } from './components/global-ui';
import { ServerFormWrapper } from './components/search-box';
import { Metadata } from 'next';
import { CardContainerSkelleton } from './components/skelletons/card-skelleton';

//todo Cambiar on air por trending y ademas ponerlo de principal

export const metadata: Metadata = {
  title: `Welcome to MovieParadise by procastinatorDev`,
  description: `Discover the finest TV shows and movies, get a sneak peek into future blockbusters, and explore cinema's best all in one place.`,
  openGraph: {
    type: 'website',
    url: `https://movie-paradise-seven.vercel.app`,
    title: `Welcome to MovieParadise by procastinatorDev`,
    description: `Discover the finest TV shows and movies, get a sneak peek into future blockbusters, and explore cinema's best all in one place.`,
    siteName: 'Movie Paradise',
    images: [
      {
        url: `https://movie-paradise-seven.vercel.app/logo.png`,
        secureUrl: `https://movie-paradise-seven.vercel.app/logo.png`,
        width: 240,
        height: 240,
        type: 'png',
        alt: `logo`
      }
    ]
  },
  twitter: {
    site: `https://movie-paradise-seven.vercel.app`,
    title: `Welcome to MovieParadise by procastinatorDev`,
    description: `Discover the finest TV shows and movies, get a sneak peek into future blockbusters, and explore cinema's best all in one place.`,
    images: [
      {
        url: `https://movie-paradise-seven.vercel.app/logo.png`,
        width: 240,
        height: 240
      }
    ]
  }
};

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
        <Title>Discover TV&apos;s finest with our Top Rated Picks.</Title>
        <TvShowsContainer promise={topRatedTvShowsResponse} />
      </section>
      <section className='overflow-hidden container px-4 lg:px-20 py-10 relative'>
        <Title>Today&apos;s TV, right at your fingertips.</Title>
        <Suspense fallback={<CardContainerSkelleton />}>
          <TvShowsContainer promise={tvShowsOnAirResponse} />
        </Suspense>
      </section>
      <section className='overflow-hidden container px-4 lg:px-20 py-10 relative space-y-5'>
        <Title>Sneak peek into future blockbusters.</Title>
        <Suspense fallback={<CardContainerSkelleton />}>
          {' '}
          <MoviesContainer promise={upcomingMoviesResponse} />
        </Suspense>
      </section>
      <section className='overflow-hidden container px-4 lg:px-20 py-10 relative space-y-5'>
        <Title>Cinema&apos;s best in one place.</Title>
        <Suspense fallback={<CardContainerSkelleton />}>
          {' '}
          <MoviesContainer promise={topRatedMoviesResponse} />
        </Suspense>
      </section>
    </>
  );
}
