import {
  TV_SHOWS_ENDPOINTS,
  TV_SHOWS_DETAILS_SLUGS
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

async function TvShowDetails({ params }: Props) {
  const id = params.id;

  const DETAILS_URL = TV_SHOWS_ENDPOINTS.DETAILS + id.toString();

  const { CAST, IMAGES, PROVIDERS, SIMILAR, VIDEOS, SEASONS } =
    TV_SHOWS_DETAILS_SLUGS;

  const showDetails = await queryTMDB<any>(DETAILS_URL);
  const credits = queryTMDB<any>(DETAILS_URL + '/' + CAST);
  const images = queryTMDB<any>(DETAILS_URL + IMAGES);
  const providers = queryTMDB<any>(DETAILS_URL + PROVIDERS);
  const similar = queryTMDB<any>(DETAILS_URL + SIMILAR);
  const videos = queryTMDB<any>(DETAILS_URL + VIDEOS);

  if (showDetails === undefined) {
    return <p>Smething went wrong</p>;
  }

  if ('statusText' in showDetails) {
    return <p>{`${showDetails.status}: ${showDetails.statusText}`}</p>;
  }

  const info = {
    country: showDetails.production_countries,
    genres: showDetails.genres,
    overview: showDetails.overview,
    poster: showDetails.poster_path,
    rating: showDetails.vote_average,
    tagline: showDetails.tagline,
    title: showDetails.name
  };

  return (
    <section className='w-full flex flex-col items-center space-y-16'>
      <Backdrop src={showDetails.backdrop_path} alt={showDetails.title}>
        <Info info={info} />
      </Backdrop>
      <section className='relative container px-4 md:px-20'>
        <h2 className='text-4xl py-4 font-bold text-primary-400'>
          Meet the crew
        </h2>
        <Cast promise={credits} />
      </section>
      <section className='relative container px-4 md:px-20'>
        <h2 className='text-4xl font-bold py-4 text-primary-400'>
          Related Media
        </h2>
        <Media videosPromise={videos} imagesPromise={images} />
      </section>
    </section>
  );
}

export default TvShowDetails;
