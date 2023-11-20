'use client';
import { useSearchParams } from 'next/navigation';
import { TargetButtonLink } from './target-button';

const targets = Object.freeze({
  Movies: 'movies',
  Collections: 'collections',
  TvShows: 'tv',
  People: 'people'
});

type Props = {
  totalResults: {
    movies: number;
    collections: number;

    tv: number;
    people: number;
  };
};

export const SideBar = ({ totalResults }: Props) => {
  return (
    <nav className='flex items-center place-content-center'>
      <ul className='flex flex-col space-y-4'>
        {Object.entries(targets).map(([key, value]) => (
          <TargetButtonLink
            key={key}
            resultsCount={totalResults[value]}
            target={value}
          >
            {key}
          </TargetButtonLink>
        ))}
      </ul>
    </nav>
  );
};
