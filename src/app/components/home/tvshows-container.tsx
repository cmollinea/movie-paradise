import { ApiError } from '@/app/services/queryTMDB';
import { TvShowsResponse } from 'root/types';
import { SomethingWentWrong, ErrorWithStatus } from '../error';
import { CardContainer, CardLink } from '.';

type Props = {
  promise:
    | Promise<TvShowsResponse | ApiError | undefined>
    | TvShowsResponse
    | ApiError
    | undefined;
};

export async function TvShowsContainer({ promise }: Props) {
  let tvShows;

  if (promise !== undefined && 'results' in promise) {
    tvShows = promise;
  } else {
    tvShows = await promise;
  }

  if (tvShows === undefined) {
    return <SomethingWentWrong />;
  }

  if ('statusText' in tvShows) {
    return (
      <ErrorWithStatus
        status={tvShows.status}
        statusText={tvShows.statusText}
      />
    );
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
        return (
          <CardLink
            imageSizes='poster'
            element={element}
            type='tv'
            key={show.id}
          />
        );
      })}
    </CardContainer>
  );
}
