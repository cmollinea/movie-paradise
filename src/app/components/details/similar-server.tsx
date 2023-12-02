import { MediaType } from 'root/types';
import { CardContainer, CardLink } from '../home';
import { MovieSimilar } from 'root/types/movie-response-full';
import { TvSimilar } from 'root/types/tvshows-response-full';

type Props = {
  similars: MovieSimilar | TvSimilar;
  type: MediaType;
};

export async function ServerSimilar({ similars, type }: Props) {
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
            type={type}
            element={similar}
            imageSizes='backdrop'
          />
        );
      })}
    </CardContainer>
  );
}
