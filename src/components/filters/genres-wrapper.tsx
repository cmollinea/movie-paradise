import { getGenresEndpoint } from '@/helpers';
import { queryTMDB } from '@/services';
import { Genre } from 'root/types';
import { ErrorWithStatus, SomethingWentWrong } from '../error';
import { GenreButton } from './genre-button';
import { GenresResponse } from 'root/types/genres';

type Props = {
  tmdbMediaType: 'tv' | 'movie';
};

export const GenresWrapper = async ({ tmdbMediaType }: Props) => {
  const url = getGenresEndpoint(tmdbMediaType);

  const genres = await queryTMDB<GenresResponse>(url);

  if (genres === undefined) {
    return <SomethingWentWrong />;
  }

  if ('statusText' in genres) {
    return (
      <ErrorWithStatus status={genres.status} statusText={genres.statusText} />
    );
  }
  return (
    <div className='flex flex-wrap gap-2'>
      {genres.genres.map((genre) => (
        <GenreButton genre={genre.name} genreId={genre.id} key={genre.id} />
      ))}
    </div>
  );
};
