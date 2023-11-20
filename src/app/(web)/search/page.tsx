import { getSearchPromises } from '../../helpers/get-search-promises';
import { SearchContextProvider } from '@/app/context';
import { SearchResultsContainer } from '@/app/components/search-results/search-results-container';
import { SideBarServerWrapper } from '@/app/components/search-sidebar';
import { Suspense } from 'react';
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
    <section className='grid grid-cols-12 w-full py-16'>
      <SearchContextProvider>
        <aside className='col-span-3'>
          <Suspense fallback={<p>Loading...</p>}>
            <SideBarServerWrapper query={query} />
          </Suspense>{' '}
        </aside>
        <main className=' col-span-9'>
          <SearchResultsContainer data={data} type={target} />
        </main>
      </SearchContextProvider>
    </section>
  );
}

export default SearchResults;
