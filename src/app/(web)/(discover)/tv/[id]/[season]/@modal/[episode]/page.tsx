//todo hacer fetch al capitulo y mostrar el modal

import { EpisodeModal } from '@/app/components/episode-modal/episode-modal';
import { EpisodeSkelleton } from '@/app/components/skelletons/episode-skelleton';
import { queryTMDB } from '@/app/services';
import { Suspense } from 'react';
import { EpisodeDetails } from 'root/types/episode-details';

type Props = {
  params: {
    id: string;
    season: string;
    episode: string;
  };
};
const Episode = async ({ params }: Props) => {
  const [id, season, episode] = [
    params.id,
    params.season.split('-')[1],
    params.episode.split('-')[1]
  ];
  //todo create a function that generates every endpoint
  const endpoint = `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}}`;
  const episodePromise = queryTMDB<EpisodeDetails>(endpoint);

  return (
    <Suspense fallback={<EpisodeSkelleton />}>
      <EpisodeModal promise={episodePromise} />;
    </Suspense>
  );
};
export default Episode;
