'use client';
import { useEffect, useState } from 'react';
import { TargetButtonLink } from './target-button';
import { useParams, useSearchParams } from 'next/navigation';

const targets = Object.freeze({
  Movies: 'movies',
  Collections: 'collections',
  TvShows: 'tv',
  People: 'people'
});

type Props = {
  query: string;
};

type Results = {
  movies: number;
  tv: number;
  collections: number;
  people: number;
};

const initialResults: Results = {
  movies: 0,
  tv: 0,
  collections: 0,
  people: 0
};

export const SideBar = () => {
  // I know that the best aproach is use useQuery but it need pollyfills for iOS<15 (iam using it) so
  // I am going to use useEffect to fetch data with an abort controller for clean up async request
  // The react-query aproach is commented in the end of the script

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [results, setResults] = useState(initialResults);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getResults = async (query: string): Promise<void> => {
      console.log(
        `${window.location.origin}/api/search-results?query=${query}`
      );

      const response = await fetch(
        `${window.location.origin}/api/search-results?query=${query}`,
        { signal }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const results = await response.json();
      setResults(results);
    };

    getResults(query || '');

    return () => controller.abort();
  }, [query]);

  return (
    <nav className='flex items-center place-content-center overflow-auto container'>
      <ul className='flex max-sm:max-w-sm max-lg:px-4 py-6 scrollbar-hide max-lg:snap-x lg:flex-col max-lg:space-x-4 lg:space-y-4 overflow-x-auto'>
        {Object.entries(targets).map(([key, value]) => (
          <TargetButtonLink
            key={key}
            resultsCount={results ? results[value] : 0}
            target={value}
          >
            {key}
          </TargetButtonLink>
        ))}
      </ul>
    </nav>
  );
};

// This is the getResults function implemented with react=query a a query-function

// const getResults = async ({
//   queryKey
// }: QueryFunctionContext): Promise<Results> => {
//   const [_key, { query }] = queryKey;

//   const response = await fetch(
//     `${window.location.origin}/api/search-results?query=${query}`
//   );
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// useQuery iplemented
// const data = useQuery({
//   queryKey: ['results', { query }],
//   queryFn: getResults
// });
