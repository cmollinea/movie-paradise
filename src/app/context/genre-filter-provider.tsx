'use client';
import { useSearchParams } from 'next/navigation';
import { createContext, useState } from 'react';
import { filters } from '../constants';

type GenreContext = {
  genres: string[] | [];
  checkIfGenreIsFiltered: (genreId: string) => boolean;
  handleGenreButtonCLick: (genreId: string, isUsed: boolean) => void;
};

export const genreContext = createContext<GenreContext | null>(null);

type Props = {
  children: React.ReactNode;
};

export const GenreFilterProvider = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const [genres, setGenres] = useState<string[]>(
    searchParams.get(filters.genre)?.split(',') || []
  );

  const checkIfGenreIsFiltered = (genreId: string) => {
    return genres?.includes(genreId);
  };

  const addGenre = (genreId: string) => {
    if (genres?.includes(genreId)) {
      return;
    }

    setGenres((prev) => [...prev, genreId]);
  };

  const removeGenre = (genreId: string) => {
    setGenres([...genres].filter((item) => item !== genreId));
  };

  const handleGenreButtonCLick = (genreId: string, isUsed: boolean) => {
    if (isUsed) {
      removeGenre(genreId);
      return;
    }
    addGenre(genreId);
  };

  return (
    <genreContext.Provider
      value={{
        genres,
        checkIfGenreIsFiltered,
        handleGenreButtonCLick
      }}
    >
      {children}
    </genreContext.Provider>
  );
};
