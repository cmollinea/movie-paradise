'use client';
import { filters } from '@/app/constants';
import { useGenreFiltersContext } from '@/app/hooks/useGenreFilters';
import { useSortByContext } from '@/app/hooks/useSortByContext';
import { useVoteAverageContext } from '@/app/hooks/useVoteAverageContext';
import { useVoteCountContext } from '@/app/hooks/useVoteCountContext';
import { Button } from '@nextui-org/react';
import { Filters } from 'root/types/discover-types';
import { sortStrings } from './sort-select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const FilterButton = () => {
  const { sortFilter } = useSortByContext();
  const { genres } = useGenreFiltersContext();
  const { voteCount } = useVoteCountContext();
  const { voteRange } = useVoteAverageContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let filters: Filters = {
    sort_by: sortFilter || sortStrings[0].value,
    vote_count_gte: voteCount.toString(),
    vote_average_gte: voteRange[0].toString(),
    vote_average_lte: voteRange[1].toString()
  };

  if (genres.length > 0) {
    filters.with_genres = genres.join(',');
  }

  const handleFilter = (filters: Filters) => {
    const searchParamsInstance = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) =>
      searchParamsInstance.set(key, value)
    );

    router.push(pathname + '?' + searchParamsInstance.toString());
  };

  return (
    <div className='px-2 mt-4'>
      <Button
        onClick={() => handleFilter(filters)}
        variant='shadow'
        size='lg'
        className='w-full bg-gradient-to-r from-secondary-400 to-primary-400 backdrop-blur-2xl font-bold text-lg'
      >
        Search
      </Button>
    </div>
  );
};
