import { Discover, NotSuspendedPagination } from '@/components/discover';
import { DiscoverSkelleton } from '@/components/skelletons/discover-skelleton';
import { PaginationProvider } from '@/context';
import { Suspense } from 'react';
import { Filters } from 'root/types/discover-types';

type Props = {
  searchParams: Filters;
};

const Movies = ({ searchParams }: Props) => {
  return (
    <div className='grid justify-items-center gap-10'>
      <PaginationProvider>
        <NotSuspendedPagination />
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<DiscoverSkelleton />}
        >
          <Discover type='movie' searchParams={searchParams} />
        </Suspense>
      </PaginationProvider>
    </div>
  );
};
export default Movies;
