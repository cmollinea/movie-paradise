import { NotSuspendedPagination } from '@/components/discover/not-suspended-pagination';
import { Discover } from '@/components/discover/discover';
import { DiscoverSkelleton } from '@/components/skelletons/discover-skelleton';
import { PaginationProvider } from '@/context/pagination-provider';
import { Suspense } from 'react';
import { Filters } from 'root/types/discover-types';

type Props = {
  searchParams: Filters;
};

const Tv = ({ searchParams }: Props) => {
  return (
    <div className='grid justify-items-center gap-10'>
      <PaginationProvider>
        <NotSuspendedPagination />
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<DiscoverSkelleton />}
        >
          <Discover type='tv' searchParams={searchParams} />
        </Suspense>
      </PaginationProvider>
    </div>
  );
};
export default Tv;
