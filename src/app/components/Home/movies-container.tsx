import { ApiError } from '@/app/services/queryTMDB';
import { MovieResponse } from '../../../../types/movie-response-interface';
import { CardContainer, CardLink } from '.';
import { SomethingWentWrong, ErrorWithStatus } from '../error';

type Props = {
  promise: Promise<ApiError | MovieResponse | undefined>;
};

async function MoviesContainer({ promise }: Props) {
  const movies = await promise;

  if (movies === undefined) {
    return <SomethingWentWrong />;
  }

  if ('status' in movies) {
    return (
      <ErrorWithStatus status={movies.status} statusText={movies.statusText} />
    );
  }

  return (
    <CardContainer>
      {movies?.results.map((movie) => {
        const element = {
          id: movie.id,
          name: movie.title,
          rating: movie.vote_average,
          poster_path: movie.poster_path
        };
        return <CardLink element={element} type='movies' key={movie.id} />;
      })}
    </CardContainer>
  );
}
export default MoviesContainer;
