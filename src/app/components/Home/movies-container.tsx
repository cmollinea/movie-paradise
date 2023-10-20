import { ApiError } from '@/app/services/queryTMDB';
import { MovieResponse } from '../../../../types/movie-response-interface';
import Card from './card';
import CardContainer from './card-container';

type Props = {
  promise: Promise<ApiError | MovieResponse | undefined>;
};

async function MoviesContainer({ promise }: Props) {
  const movies = await promise;

  if (movies === undefined) {
    return <p>Something went wrong</p>;
  }

  if ('status' in movies) {
    return <p>{`${movies.status}: ${movies.statusText}`}</p>;
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
        return <Card element={element} type='movies' key={movie.id} />;
      })}
    </CardContainer>
  );
}
export default MoviesContainer;
