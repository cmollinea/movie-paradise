'use client';

import { Movie, TvShow } from 'root/types';
import { CardLink } from '../home';
import { usePaginationContext } from '@/hooks/usePaginationContext';
import { useEffect } from 'react';

type Props = {
  currentPage: string;
  totalPage: number;
  type: 'movie' | 'tv';
  results: Movie[] | TvShow[];
};

export const DiscoverResults = ({
  currentPage,
  totalPage,
  results,
  type
}: Props) => {
  console.log(currentPage, totalPage);

  const {
    paginationCtx: { setPages }
  } = usePaginationContext();

  useEffect(() => {
    setPages({ current: currentPage, total: totalPage });
  }, [setPages, totalPage, currentPage]);

  return (
    <>
      {results.map((item) => (
        <CardLink
          key={item.id}
          type={type === 'movie' ? 'movies' : 'tv'}
          imageSizes='poster'
          element={{
            id: item.id,
            name: 'name' in item ? item.name : item.title,
            poster_path: item.poster_path,
            rating: item.vote_average
          }}
        />
      ))}
    </>
  );
};
