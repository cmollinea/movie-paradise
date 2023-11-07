import { Backdrop, Details, Cast, Media } from '@/app/components/details';
import { queryTMDB } from '@/app/services/queryTMDB';
import {
  MOVIES_ENPOINTS,
  MOVIE_DETAILS_SLUGS
} from '@/app/constants/api-endpoints';

import type {
  MovieImages,
  MovieVideos,
  Credits,
  MovieDetails
} from 'root/types';
import InfoContextProvider from '@/app/context/info-context-provider';
import SomethingWentWrong from '@/app/components/error/error';
import ErrorWithStatus from '@/app/components/error/api-error';

type Props = {
  params: {
    id: string;
  };
};

async function MovieDetails({ params }: Props) {
  const id = params.id;

  const DETAILS_URL = MOVIES_ENPOINTS.DETAILS + id.toString();

  const { CAST, IMAGES, VIDEOS } = MOVIE_DETAILS_SLUGS;

  const movieDetails = await queryTMDB<MovieDetails>(DETAILS_URL);
  const credits = queryTMDB<Credits>(DETAILS_URL + '/' + CAST);
  const images = queryTMDB<MovieImages>(DETAILS_URL + IMAGES);
  // const providers = queryTMDB<Providers>(DETAILS_URL + PROVIDERS);
  // const similar = queryTMDB<TvShowSimilar>(DETAILS_URL + SIMILAR);
  const videos = queryTMDB<MovieVideos>(DETAILS_URL + VIDEOS);

  if (movieDetails === undefined) {
    return <SomethingWentWrong />;
  }

  if ('statusText' in movieDetails) {
    return (
      <ErrorWithStatus
        status={movieDetails.status}
        statusText={movieDetails.statusText}
      />
    );
  }

  const info = {
    title: movieDetails.title,
    id: parseInt(id),
    overview: movieDetails.overview,
    poster: movieDetails.poster_path,
    country: movieDetails.production_countries,
    genres: movieDetails.genres,
    rating: movieDetails.vote_average,
    tagline: movieDetails.tagline
  };

  return (
    <section className='w-full flex flex-col items-center'>
      <Backdrop src={movieDetails.backdrop_path} alt={movieDetails.title}>
        <InfoContextProvider info={info} mediaType='movie'>
          <Details />
        </InfoContextProvider>
      </Backdrop>
      <section className='relative container py-10 px-20'>
        <h2 className='text-4xl py-4'>Actors</h2>
        <Cast promise={credits} />
      </section>
      <section className='relative container py-10 px-20'>
        <h2 className='text-4xl py-4'>Media</h2>
        <Media videosPromise={videos} imagesPromise={images} />
      </section>
      <section className='relative container py-10 px-20'>
        <h2 className='text-4xl py-4'>Similar</h2>
        {/* <Similar /> */}
      </section>
    </section>
  );
}

export default MovieDetails;
