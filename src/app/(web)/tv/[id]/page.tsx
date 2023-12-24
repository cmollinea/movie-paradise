import {
  Backdrop,
  Cast,
  Details,
  MediaTabs,
  ServerSimilar
} from '@/app/components/details';
import { BASE_URL, POSTER_SIZES } from '@/app/constants/image-url';
import { CommentForm, CommentsContainer } from '@/app/components/comments';
import { getTMDBEndpoint } from '@/app/helpers/get-tmdb-endpoint';
import { Info } from 'root/types';
import { ButtonStatusProvider, InfoContextProvider } from '@/app/context';
import { Metadata } from 'next';
import { queryTMDB } from '@/app/services/queryTMDB';
import { SeasonContainer } from '@/app/components/season-container/season-container-';
import { Section } from '@/app/components/global-ui/section';
import { SomethingWentWrong, ErrorWithStatus } from '@/app/components/error';
import { Suspense } from 'react';
import { Title } from '@/app/components/global-ui';
import { TvShowFullDetails } from 'root/types/tvshows-response-full';
import { checkButtonStatus, createServerSupabaseCli } from '@/app/helpers';
import { ActionButtons } from '@/app/components/action-buttons';
import { ActionButtonServerWrapper } from '@/app/components/action-buttons/action-buttons-server-wrapper';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;
  const DETAILS_URL = getTMDBEndpoint(id, 'tv');

  // fetch data

  const showDetails = await queryTMDB<TvShowFullDetails>(DETAILS_URL);

  if (showDetails && !('statusText' in showDetails)) {
    return {
      title: showDetails.name + ' • Movie Paradise',
      description: showDetails.overview,
      openGraph: {
        type: 'website',
        url: `https://movie-paradise-seven.vercel.app/movies/${id}`,
        title: showDetails.name + ' • Movie Paradise',
        description: showDetails.overview,
        siteName: 'Movie Paradise',
        images: [
          {
            url: `${BASE_URL + POSTER_SIZES.xxs + showDetails.poster_path}`,
            secureUrl: `${
              BASE_URL + POSTER_SIZES.xxs + showDetails.poster_path
            }`,
            width: 92,
            height: 138,
            type: 'jpg',
            alt: showDetails.name + 'poster'
          }
        ]
      },
      twitter: {
        site: `https://movie-paradise-seven.vercel.app/movies/${id}`,
        title: showDetails.name + ' • Movie Paradise',
        description: showDetails.overview,
        images: [
          {
            url: `${BASE_URL + POSTER_SIZES.xxs + showDetails.poster_path}`,
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

async function TvShowDetails({ params }: Props) {
  const supabase = createServerSupabaseCli();
  const id = params.id;
  const DETAILS_URL = getTMDBEndpoint(id, 'tv');

  const [
    {
      data: { session }
    },
    showDetails
  ] = await Promise.all([
    supabase.auth.getSession(),
    queryTMDB<TvShowFullDetails>(DETAILS_URL)
  ]);

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

  const info: Info = {
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
    <section className='w-full'>
      <Backdrop src={showDetails.backdrop_path}>
        <InfoContextProvider info={info} mediaType='tv' session={session}>
          <Details>
            <Suspense fallback={<p>Loading</p>}>
              <ActionButtonServerWrapper session={session} id={id} />
            </Suspense>
          </Details>
        </InfoContextProvider>
      </Backdrop>

      <div className='grid xl:grid-cols-12'>
        <div className='xl:col-span-8'>
          <Section>
            <Title>Meet the crew</Title>
            <Suspense fallback={<p>Loading...</p>}>
              <Cast credits={showDetails.credits} />
            </Suspense>
          </Section>

          <Section>
            <Title>Related Media</Title>
            <Suspense fallback={<p>Loading...</p>}>
              <MediaTabs
                videos={showDetails.videos}
                images={showDetails.images}
              />
            </Suspense>
          </Section>

          <Section>
            <Title>Similar</Title>
            <Suspense fallback={<p>Loading...</p>}>
              <ServerSimilar similars={showDetails.similar} type='tv' />
            </Suspense>
          </Section>

          <Section>
            <Title>Stay up to date!</Title>
            <SeasonContainer seasons={showDetails.seasons} />
          </Section>
          <div className='xl:col-span-4 px-4 md:px-20 py-10 flex flex-col space-y-10'>
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
      </div>
    </section>
  );
}

export default TvShowDetails;
