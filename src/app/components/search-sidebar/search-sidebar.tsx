'use client';
import { TargetButtonLink } from './target-button';
import {
  QueryClient,
  QueryClientProvider as Provider,
  useQuery,
  QueryKey,
  QueryFunctionContext
} from '@tanstack/react-query';
const queryClient = new QueryClient();

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

const getResults = async ({
  queryKey
}: QueryFunctionContext): Promise<Results> => {
  //@ts-expect-error
  const [_key, { query }] = queryKey;

  console.log(`${window.location.origin}/api/search-results?query=${query}`);

  const response = await fetch(
    `${window.location.origin}/api/search-results?query=${query}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const SideBar = ({ query }: Props) => {
  const data = useQuery({
    queryKey: ['results', { query }],
    queryFn: getResults
  });

  console.log(data.data);

  return (
    <nav className='flex items-center place-content-center overflow-auto container'>
      <ul className='flex max-md:max-w-sm max-lg:px-4 py-6 scrollbar-hide max-lg:snap-x lg:flex-col max-lg:space-x-4 lg:space-y-4 overflow-x-auto'>
        {Object.entries(targets).map(([key, value]) => (
          <TargetButtonLink
            key={key}
            resultsCount={data.data ? data.data[value] : 0}
            target={value}
          >
            {key}
          </TargetButtonLink>
        ))}
      </ul>
    </nav>
  );
};
