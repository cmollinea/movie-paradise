import { ApiError } from '@/app/services/queryTMDB';
import { TvShowsResponse } from '../../../../types/tvshows-response-interface';
import Card from './card';
import CardContainer from './card-container';

type Props = {
  promise: Promise<TvShowsResponse | ApiError | undefined>;
};

async function TopRatedTvShows({ promise }: Props) {
  const tvShows = await promise;

  if (tvShows === undefined) {
    return <p>Something went wrong</p>;
  }

  if ('status' in tvShows) {
    return <p>{`${tvShows.status}: ${tvShows.statusText}`}</p>;
  }

  return (
    <CardContainer>
      {tvShows?.results.map((show) => {
        const element = {
          id: show.id,
          name: show.name,
          rating: show.vote_average,
          poster_path: show.poster_path
        };
        return <Card element={element} type='tv' key={show.id} />;
      })}
    </CardContainer>
  );
}
export default TopRatedTvShows;
