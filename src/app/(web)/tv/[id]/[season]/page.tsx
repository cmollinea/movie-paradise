import { ErrorWithStatus, SomethingWentWrong } from '@/app/components/error';
import { getTMDBEndpoint } from '@/app/helpers/get-tmdb-endpoint';
import { queryTMDB } from '@/app/services';
import { SeasonResponse } from 'root/types/season-response';
import { Title } from '@/app/components/global-ui';
import { EpisodeCardLink } from '@/app/components/episode-card-link/episode-card-link';

type Props = {
  params: {
    id: string;
    season: string;
  };
};

async function Season({ params }: Props) {
  const seasonNumber = params.season.split('-')[1];
  const id = params.id;
  const url = getTMDBEndpoint(id, 'season', seasonNumber);
  const seasonData = await queryTMDB<SeasonResponse>(url);

  if (seasonData === undefined) {
    return <SomethingWentWrong />;
  }

  if ('statusText' in seasonData) {
    return (
      <ErrorWithStatus
        status={seasonData.status}
        statusText={seasonData.statusText}
      />
    );
  }

  return (
    <section className='px-4 ld:px-20 py-10'>
      <div className='grid gap-1 font-bold mb-10'>
        <Title>
          Season {seasonData.season_number}
          {seasonData.name.includes(`Season: ${seasonData.season_number}`)
            ? `: ${seasonData.name}`
            : ''}
        </Title>

        <p>
          <span className='opacity-50 font-light'>Air date:</span>{' '}
          {seasonData.air_date ? seasonData.air_date.toLocaleString() : '-'}
        </p>
        <p>
          <span className='opacity-50 font-light'>Total Episodes:</span>{' '}
          {seasonData.episodes.length}
        </p>
      </div>
      <div className='grid lg:grid-cols-2 gap-4 w-full'>
        {seasonData.episodes.map((episode) => (
          <EpisodeCardLink
            key={episode.id}
            episodeNumber={episode.episode_number}
            name={episode.name}
            image={episode.still_path}
            href={`/tv/${id}/season-${seasonNumber}/episode-${episode.episode_number}`}
          />
        ))}
      </div>
    </section>
  );
}
export default Season;
