import { MediaType, MovieSimilars, TvShowSimilar } from 'root/types';
import { ErrorWithStatus, SomethingWentWrong } from '../error';
import { ApiError } from '@/app/services/queryTMDB';
import { CardContainer, CardLink } from '../home';

type Props = {
  promise: Promise<ApiError | MovieSimilars | TvShowSimilar | undefined>;
  type: MediaType;
};

async function ServerSimilar({ promise, type }: Props) {
  const similars = await promise;

  if (similars === undefined) {
    return <SomethingWentWrong />;
  }

  if ('status' in similars) {
    return (
      <ErrorWithStatus
        status={similars.status}
        statusText={similars.statusText}
      />
    );
  }

  return (
    <CardContainer>
      {similars.results.map((item) => {
        const similar = {
          id: item.id,
          name: 'title' in item ? item.title : item.name,
          rating: item.vote_average,
          poster_path: item.backdrop_path
        };
        return (
          <CardLink
            key={item.id}
            type='movies'
            element={similar}
            imageSizes='backdrop'
          />
        );
      })}
    </CardContainer>
  );
}
export default ServerSimilar;
