import {
  Backdrop,
  Details,
  Cast,
  Media,
  ServerSimilar
} from '@/app/components/details';
import { queryTMDB } from '@/app/services/queryTMDB';
import {
  MOVIES_ENPOINTS,
  MOVIE_DETAILS_SLUGS
} from '@/app/constants/api-endpoints';

import type {
  MovieImages,
  MovieVideos,
  Credits,
  MovieDetails,
  MovieSimilars
} from 'root/types';
import { InfoContextProvider } from '@/app/context';
import { SomethingWentWrong, ErrorWithStatus } from '@/app/components/error';
import { Title } from '@/app/components/global-ui';
import { CommentSection } from '@/app/components/comments/comments-section';

type Props = {
  params: {
    id: string;
  };
};

async function MovieDetails({ params }: Props) {
  const id = params.id;

  const DETAILS_URL = MOVIES_ENPOINTS.DETAILS + id.toString();

  const { CAST, IMAGES, VIDEOS, SIMILAR } = MOVIE_DETAILS_SLUGS;

  const movieDetails = await queryTMDB<MovieDetails>(DETAILS_URL);
  const credits = queryTMDB<Credits>(DETAILS_URL + '/' + CAST);
  const images = queryTMDB<MovieImages>(DETAILS_URL + IMAGES);
  // const providers = queryTMDB<Providers>(DETAILS_URL + PROVIDERS);
  const similar = queryTMDB<MovieSimilars>(DETAILS_URL + SIMILAR);
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
    id: id,
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
        <InfoContextProvider info={info} mediaType='movies'>
          <Details />
        </InfoContextProvider>
      </Backdrop>
      <section className='relative container py-10 px-4 md:px-20'>
        <Title>Actors</Title>
        <Cast promise={credits} />
      </section>
      <section className='relative container py-10 px-4 md:px-20'>
        <Title>Media</Title>
        <Media videosPromise={videos} imagesPromise={images} />
      </section>
      <section className='relative container py-10 px-4 md:px-20'>
        <Title>Similar</Title>
        <ServerSimilar promise={similar} type='movies' />
      </section>
      <section className='relative container py-10 px-4 md:px-20'>
        <CommentSection
          mediaItem={{
            id: info.id,
            title: info.title,
            overview: info.overview,
            poster: info.poster
          }}
        />
      </section>
    </section>
  );
}

export default MovieDetails;
