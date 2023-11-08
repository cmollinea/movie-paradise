import {
  TV_SHOWS_ENDPOINTS,
  TV_SHOWS_DETAILS_SLUGS
} from '@/app/constants/api-endpoints';
import {
  Backdrop,
  Cast,
  Details,
  Media,
  ServerSimilar
} from '@/app/components/details';
import { queryTMDB } from '@/app/services/queryTMDB';
import { Suspense } from 'react';
import InfoContextProvider from '@/app/context/info-context-provider';

import type {
  Credits,
  MovieImages,
  MovieVideos,
  TvSHowDetail,
  TvShowSimilar
} from 'root/types';
import SomethingWentWrong from '@/app/components/error/error';
import ErrorWithStatus from '@/app/components/error/api-error';
import { Title } from '@/app/components/global-ui';

type Props = {
  params: {
    id: string;
  };
};

async function TvShowDetails({ params }: Props) {
  const id = params.id;
  const DETAILS_URL = TV_SHOWS_ENDPOINTS.DETAILS + id;
  const { CAST, IMAGES, VIDEOS, SIMILAR } = TV_SHOWS_DETAILS_SLUGS;

  const showDetails = await queryTMDB<TvSHowDetail>(DETAILS_URL);
  const credits = queryTMDB<Credits>(DETAILS_URL + '/' + CAST);
  const images = queryTMDB<MovieImages>(DETAILS_URL + IMAGES);
  // const providers = queryTMDB<Providers>(DETAILS_URL + PROVIDERS);
  const similar = queryTMDB<TvShowSimilar>(DETAILS_URL + SIMILAR);
  const videos = queryTMDB<MovieVideos>(DETAILS_URL + VIDEOS);

  if (showDetails === undefined) {
    return <SomethingWentWrong />;
  }

  if ('statusText' in showDetails) {
    return (
      <ErrorWithStatus
        status={showDetails.status}
        statusText={showDetails.statusText}
      />
    );
  }

  const info = {
    title: showDetails.name,
    id: id,
    overview: showDetails.overview,
    poster: showDetails.poster_path,
    country: showDetails.production_countries,
    genres: showDetails.genres,
    rating: showDetails.vote_average,
    tagline: showDetails.tagline
  };

  return (
    <section className='w-full flex flex-col items-center space-y-16'>
      <Backdrop src={showDetails.backdrop_path} alt={showDetails.name}>
        <InfoContextProvider info={info} mediaType='tv'>
          <Details />
        </InfoContextProvider>
      </Backdrop>
      <section className='relative container px-4 md:px-20'>
        <h2 className='text-4xl py-4 font-bold text-primary-400'>
          Meet the crew
        </h2>
        <Suspense fallback={<p>Loading...</p>}>
          <Cast promise={credits} />
        </Suspense>
      </section>
      <section className='relative container px-4 md:px-20'>
        <h2 className='text-4xl font-bold py-4 text-primary-400'>
          Related Media
        </h2>
        <Suspense fallback={<p>Loading...</p>}>
          <Media videosPromise={videos} imagesPromise={images} />
        </Suspense>{' '}
      </section>
      <section className='relative container py-10 px-20'>
        <Title>Similar</Title>
        <Suspense fallback={<p>Loading...</p>}>
          <ServerSimilar promise={similar} type='movies' />
        </Suspense>
      </section>
    </section>
  );
}

export default TvShowDetails;
