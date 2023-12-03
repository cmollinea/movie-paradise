import {
  Backdrop,
  Cast,
  Details,
  MediaTabs,
  ServerSimilar
} from '@/app/components/details';
import { CommentForm, CommentsContainer } from '@/app/components/comments';
import { getDetailsUrl } from '@/app/helpers/getDetailsUrl';
import { InfoContextProvider } from '@/app/context';
import { queryTMDB } from '@/app/services/queryTMDB';
import { Section } from '@/app/components/global-ui/section';
import { SomethingWentWrong, ErrorWithStatus } from '@/app/components/error';
import { Suspense } from 'react';
import { Title } from '@/app/components/global-ui';
import { TvShowFullDetails } from 'root/types/tvshows-response-full';
import CardLinkWithDescription from '@/app/components/global-ui/card-link-with-description';
import { MediaType } from 'root/types';

type Props = {
  params: {
    id: string;
  };
};

async function TvShowDetails({ params }: Props) {
  const id = params.id;
  const DETAILS_URL = getDetailsUrl(id, 'tv');
  const showDetails = await queryTMDB<TvShowFullDetails>(DETAILS_URL);

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
      <Backdrop src={showDetails.backdrop_path}>
        <InfoContextProvider info={info} mediaType='tv'>
          <Details />
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
            <ul className='w-fit grid gap-6 max-w-[95vw]'>
              {showDetails.seasons.map((season) => {
                if (season.season_number > 0) {
                  const media = {
                    description: season.overview,
                    mediaType: 'season' as MediaType,
                    poster: season.poster_path,
                    title: season.name,
                    seasonLink: `/tv/${id}/season-${season.season_number}`,
                    seasonNumber: `Season: ${season.season_number} | ${season.episode_count} episodes`
                  };
                  return (
                    <CardLinkWithDescription key={season.id} media={media} />
                  );
                }
              })}
            </ul>
          </Section>
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
      </div>
    </section>
  );
}

export default TvShowDetails;
