'use client';

import { useGenreFiltersContext } from '@/app/hooks/useGenreFilters';
import { Button } from '@nextui-org/react';

type Props = {
  genre: string;
  genreId: number;
};

export const GenreButton = ({ genre, genreId }: Props) => {
  const { checkIfGenreIsFiltered, handleGenreButtonCLick } =
    useGenreFiltersContext();

  const isUsed = checkIfGenreIsFiltered(genreId.toString());

  return (
    <Button
      size='sm'
      onClick={() => handleGenreButtonCLick(genreId.toString(), isUsed)}
      variant={isUsed ? 'shadow' : 'bordered'}
      color='primary'
    >
      {genre}
    </Button>
  );
};
