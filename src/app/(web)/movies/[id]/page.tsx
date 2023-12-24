import {
  Backdrop,
  Details,
  Cast,
  ServerSimilar,
  MediaTabs
} from '@/app/components/details';
import { CommentForm, CommentsContainer } from '@/app/components/comments';
import { ButtonStatusProvider, InfoContextProvider } from '@/app/context';
import { MovieFullDetails } from 'root/types/movie-response-full';
import { queryTMDB } from '@/app/services/queryTMDB';
import { Section } from '@/app/components/global-ui/section';
import { SomethingWentWrong, ErrorWithStatus } from '@/app/components/error';
import { Suspense } from 'react';
import { Title } from '@/app/components/global-ui';
import { getTMDBEndpoint } from '@/app/helpers/get-tmdb-endpoint';
import { Metadata } from 'next';
import { BASE_URL, POSTER_SIZES } from '@/app/constants/image-url';
import { checkButtonStatus, createServerSupabaseCli } from '@/app/helpers';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;
  const DETAILS_URL = getTMDBEndpoint(id, 'movie');

  // fetch data

  const movieDetails = await queryTMDB<MovieFullDetails>(DETAILS_URL);

  if (movieDetails && !('statusText' in movieDetails)) {
    return {
      title: movieDetails.title + ' • Movie Paradise',
      description: movieDetails.overview,
      openGraph: {
        type: 'website',
        url: `https://movie-paradise-seven.vercel.app/movies/${id}`,
        title: movieDetails.title + ' • Movie Paradise',
        description: movieDetails.overview,
        siteName: 'Movie Paradise',
        images: [
          {
            url: `${BASE_URL + POSTER_SIZES.xxs + movieDetails.poster_path}`,
            secureUrl: `${
              BASE_URL + POSTER_SIZES.xxs + movieDetails.poster_path
            }`,
            width: 92,
            height: 138,
            type: 'jpg',
            alt: movieDetails.title + 'poster'
          }
        ]
      },
      twitter: {
        site: `https://movie-paradise-seven.vercel.app/movies/${id}`,
        title: movieDetails.title + ' • Movie Paradise',
        description: movieDetails.overview,
        images: [
          {
            url: `${BASE_URL + POSTER_SIZES.xxs + movieDetails.poster_path}`,
            width: 92,
            height: 138
          }
        ]
      }
    };
  }
  return {
    title: 'Error geting metadata • Movie Paradise',
    description: 'No description'
  };
}

async function MovieDetails({ params }: Props) {
  const id = params.id;
  const DETAILS_URL = getTMDBEndpoint(id, 'movie');
  const movieDetails = await queryTMDB<MovieFullDetails>(DETAILS_URL);

  const supabase = createServerSupabaseCli();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const isInFav = await checkButtonStatus('favs', id, session, supabase);
  const isInWatchList = await checkButtonStatus(
    'watch_list',
    id,
    session,
    supabase
  );

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
    <section className='w-full'>
      <Backdrop src={movieDetails.backdrop_path}>
        <ButtonStatusProvider buttonStatus={{ isInFav, isInWatchList }}>
          <InfoContextProvider info={info} mediaType='movies' session={session}>
            <Details />
          </InfoContextProvider>
        </ButtonStatusProvider>
      </Backdrop>
      <div className=' grid gap-4 xl:grid-cols-12'>
        <div className='xl:col-span-12'>
          <Section>
            {' '}
            <Title>Meet the crew</Title>
            <Cast credits={movieDetails.credits} />
          </Section>
          <Section>
            {' '}
            <Title>Related Media</Title>
            <MediaTabs
              images={movieDetails.images}
              videos={movieDetails.videos}
            />
          </Section>
          <Section>
            {' '}
            <Title>Similar</Title>
            <ServerSimilar similars={movieDetails.similar} type='movies' />
          </Section>
        </div>
        <div className='xl:col-span-8 px-4 lg:px-20 container py-10 flex flex-col space-y-10'>
          <Suspense fallback={<p>Loading...</p>}>
            <CommentsContainer id={id} />
          </Suspense>
          <CommentForm
            mediaItem={{
              id: info.id,
              title: info.title,
              overview: info.overview,
              poster: info.poster
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
