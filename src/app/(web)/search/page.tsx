import { SideBar } from '@/app/components/search-sidebar/search-sidebar';
import { getSearchPromises } from '../../helpers/get-search-promises';
import { SearchContextProvider } from '@/app/context';
import { SearchResultsContainer } from '@/app/components/search-results/search-results-container';
import {
  CollectionResponse,
  MovieResponse,
  PeopleResponse,
  TvShowsResponse
} from 'root/types';
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

  let totalResults = {
    movies: 0,
    tv: 0,
    people: 0,
    collections: 0
  };

  // if (movies !== undefined && !('statusText' in movies)) {
  //   totalResults.movies = movies.total_results;
  // }

  // if (tv !== undefined && !('statusText' in tv)) {
  //   totalResults.tv = tv.total_results;
  // }

  // if (collections !== undefined && !('statusText' in collections)) {
  //   totalResults.collections = collections.total_results;
  // }

  // if (people !== undefined && !('statusText' in people)) {
  //   totalResults.people = people.total_results;
  // }

  return (
    <section className='grid grid-cols-12 w-full'>
      <SearchContextProvider>
        <aside className='col-span-3'>
          <SideBar totalResults={totalResults} />
        </aside>
        <main className=' col-span-9'>
          <SearchResultsContainer data={data} type={target} />
        </main>
      </SearchContextProvider>
    </section>
  );
}

export default SearchResults;
