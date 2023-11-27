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
import { InfoContextProvider } from '@/app/context';

import type {
  Credits,
  MovieImages,
  MovieVideos,
  TvSHowDetail,
  TvShowSimilar
} from 'root/types';
import { SomethingWentWrong, ErrorWithStatus } from '@/app/components/error';
import { Title } from '@/app/components/global-ui';
import { CommentSection } from '@/app/components/comments';
import { Section } from '@/app/components/global-ui/section';
import Link from 'next/link';
import { Divider } from '@nextui-org/react';

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
    <section className='w-full'>
      <Backdrop src={showDetails.backdrop_path} alt={showDetails.name}>
        <InfoContextProvider info={info} mediaType='tv'>
          <Details />
        </InfoContextProvider>
      </Backdrop>
      <div className='grid xl:grid-cols-12'>
        <div className='xl:col-span-8'>
          <Section>
            <Title>Meet the crew</Title>
            <Suspense fallback={<p>Loading...</p>}>
              <Cast promise={credits} />
            </Suspense>
          </Section>
          <Section>
            <Title>Related Media</Title>
            <Suspense fallback={<p>Loading...</p>}>
              <Media videosPromise={videos} imagesPromise={images} />
            </Suspense>
          </Section>
          <Section>
            <Title>Similar</Title>
            <Suspense fallback={<p>Loading...</p>}>
              <ServerSimilar promise={similar} type='tv' />
            </Suspense>
          </Section>
          <Section>
            <Title>Stay up to date!</Title>
            <ul className='grid gap-4 w-full max-md:max-w-sm'>
              {showDetails.seasons.map((season) => {
                if (season.season_number > 0) {
                  return (
                    <Link
                      href={`/tv/${id}/season?number=${season.season_number}`}
                      key={season.id}
                      className='p-6 border border-foreground-500/80 rounded-md hover:border-primary transition-all ease-in-out hover:-translate-y-0.5 grid gap-2'
                    >
                      <p className='text-2xl font-bold w-fit'>
                        Season {season.season_number} |{' '}
                        <span>{season.episode_count} episodes</span>
                      </p>
                      <p className='w-fit text-medium'>
                        <b>{season.name}</b>
                      </p>
                      <p>
                        <i>{season.overview}</i>
                      </p>
                    </Link>
                  );
                }
              })}
            </ul>
          </Section>
        </div>
        <div className='xl:col-span-4'>
          <Section>
            <CommentSection
              mediaItem={{
                id: info.id,
                title: info.title,
                overview: info.overview,
                poster: info.poster
              }}
            />
          </Section>
        </div>
      </div>
    </section>
  );
}

export default TvShowDetails;
