import { useContext } from 'react';
import { genreContext } from '../context/genre-filter-provider';

export const useGenreFiltersContext = () => {
  const genreCtx = useContext(genreContext);
  if (!genreCtx) {
    throw new Error(
      'useGenreFiltersContext must be used within a GenreFilterContextProvider'
    );
  }
  return genreCtx;
};
