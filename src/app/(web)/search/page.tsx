import { getSearchPromises } from '../../helpers/get-search-promises';
import { SearchResultsContainer } from '@/app/components/search-results/search-results-container';
import { Target } from '@/app/components/search-sidebar/target-button';

type Props = {
  searchParams: {
    query: string | undefined;
    target: Target | undefined;
    page: string | undefined;
  };
};

async function SearchResults({ searchParams }: Props) {
  const query = searchParams.query || '';
  const page = searchParams.page || '1';
  const target = searchParams.target || 'movies';

  const data = await getSearchPromises(query, page, target);

  return (
    <div className='lg:col-span-9 flex flex-col items-center max-w-4xl space-y-4'>
      <SearchResultsContainer data={data} type={target} />
    </div>
  );
}

export default SearchResults;
