import { Credits } from '../../../../types/movie-credits';
import { MovieDetails } from '../../../../types/movie-details';
import {
  MOVIES_ENPOINTS,
  MOVIE_DETAILS_SLUGS
} from '@/app/constants/api-endpoints';
import { queryTMDB } from '@/app/services/queryTMDB';
import Backdrop from '@/app/components/details/backdrop';
import Info from '@/app/components/details/ppal-info';
import Cast from '@/app/components/details/cast';
import Media from '@/app/components/details/media';

type Props = {
  params: {
    id: string;
  };
};

async function MovieDetails({ params }: Props) {
  const id = params.id;

  const DETAILS_URL = MOVIES_ENPOINTS.DETAILS + id.toString();

  const { CAST, IMAGES, PROVIDERS, SIMILAR, VIDEOS } = MOVIE_DETAILS_SLUGS;

  const movieDetails = await queryTMDB<MovieDetails>(DETAILS_URL);
  const credits = queryTMDB<Credits>(DETAILS_URL + '/' + CAST);

  const images = queryTMDB<Credits>(DETAILS_URL + IMAGES);
  const providers = queryTMDB<Credits>(DETAILS_URL + PROVIDERS);
  const similar = queryTMDB<Credits>(DETAILS_URL + SIMILAR);
  const videos = queryTMDB<Credits>(DETAILS_URL + VIDEOS);

  if (movieDetails === undefined) {
    return <p>Smething went wrong</p>;
  }

  if ('statusText' in movieDetails) {
    return <p>{`${movieDetails.status}: ${movieDetails.statusText}`}</p>;
  }

  const info = {
    country: movieDetails.production_countries,
    genres: movieDetails.genres,
    overview: movieDetails.overview,
    poster: movieDetails.poster_path,
    rating: movieDetails.vote_average,
    tagline: movieDetails.tagline,
    title: movieDetails.title
  };

  return (
    <section className='w-full flex flex-col items-center'>
      <Backdrop src={movieDetails.backdrop_path} alt={movieDetails.title}>
        <Info info={info} />
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
