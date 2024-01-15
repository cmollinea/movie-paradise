import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  useGenreFiltersContext,
  useVoteCountContext,
  useVoteAverageContext,
  useSortByContext
} from './';
import { Filters } from 'root/types/discover-types';
import { sortStrings } from '../components/filters/sort-select';

export const useFilters = () => {
  const { sortFilter } = useSortByContext();
  const { genres } = useGenreFiltersContext();
  const { voteCount } = useVoteCountContext();
  const { voteRange } = useVoteAverageContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let filters = {
    sort_by: sortFilter || sortStrings[0].value,
    'vote_count.gte': voteCount.toString(),
    'vote_average.gte': voteRange[0].toString(),
    'vote_average.lte': voteRange[1].toString()
  };

  if (genres.length > 0) {
    //@ts-expect-error
    filters.with_genres = genres.join(',');
  }

  const handleFilter = () => {
    const searchParamsInstance = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) =>
      searchParamsInstance.set(key, value)
    );
    searchParamsInstance.delete('page');
    router.push(pathname + '?' + searchParamsInstance.toString());
  };
  return { handleFilter };
};
