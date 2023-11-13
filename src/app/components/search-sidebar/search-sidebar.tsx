'use client';
import { useSearchParams } from 'next/navigation';

const targets = Object.freeze({
  Movies: 'movies',
  TvShows: 'tv',
  People: 'people'
});

type Props = {
  totalResults: {
    movies: number;
    tv: number;
    people: number;
  };
};

export const SideBar = ({ totalResults }: Props) => {
  const searchParams = useSearchParams();
  const target = searchParams.get('target') || 'movies';

  return (
    <nav>
      <ul>
        {Object.entries(targets).map(([key, value]) => (
          <li key={key}>
            {key} {totalResults[value]}
          </li>
        ))}
      </ul>
    </nav>
  );
};
