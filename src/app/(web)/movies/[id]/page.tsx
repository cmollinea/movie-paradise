import {
  Backdrop,
  Details,
  Cast,
  ServerSimilar,
  MediaTabs
} from '@/app/components/details';
import { CommentForm, CommentsContainer } from '@/app/components/comments';
import { getDetailsUrl } from '@/app/helpers/getDetailsUrl';
import { InfoContextProvider } from '@/app/context';
import { MovieFullDetails } from 'root/types/movie-response-full';
import { queryTMDB } from '@/app/services/queryTMDB';
import { Section } from '@/app/components/global-ui/section';
import { SomethingWentWrong, ErrorWithStatus } from '@/app/components/error';
import { Suspense } from 'react';
import { Title } from '@/app/components/global-ui';

type Props = {
  params: {
    id: string;
  };
};

async function MovieDetails({ params }: Props) {
  const id = params.id;
  const DETAILS_URL = getDetailsUrl(id, 'movie');
  const movieDetails = await queryTMDB<MovieFullDetails>(DETAILS_URL);

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
      <Backdrop src={movieDetails.backdrop_path} alt={movieDetails.title}>
        <InfoContextProvider info={info} mediaType='movies'>
          <Details />
        </InfoContextProvider>
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
      </div>
      <div className='xl:col-span-4 px-4 py-10 flex flex-col space-y-10'>
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
    </section>
  );
}

export default MovieDetails;
