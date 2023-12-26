import { getSearchPromises } from '../../helpers/get-search-promises';
import { SearchContextProvider } from '@/app/context';
import { SearchResultsContainer } from '@/app/components/search-results/search-results-container';
import { SideBar } from '@/app/components/search-sidebar';
import { Target } from '@/app/components/search-sidebar/target-button';
import { QueryClientProvider } from '@/app/context/query-client-provider';

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
    <section className='grid lg:grid-cols-12 w-full py-16 place-content-center min-[2400px]:w-fit'>
      <SearchContextProvider>
        <aside className='lg:col-span-3'>
          <QueryClientProvider>
            <SideBar query={query} />
          </QueryClientProvider>
        </aside>
        <main className='lg:col-span-9 flex flex-col items-center max-w-4xl space-y-4'>
          <SearchResultsContainer data={data} type={target} />
        </main>
      </SearchContextProvider>
    </section>
  );
}

export default SearchResults;
