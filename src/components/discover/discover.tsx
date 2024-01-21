import { getDiscoverUrlWithQueryParams } from '@/app/helpers';
import { queryTMDB } from '@/app/services';
import { MovieResponse, TvShowsResponse } from 'root/types';
import { Filters } from 'root/types/discover-types';
import { ErrorWithStatus, SomethingWentWrong } from '../error';
import { DiscoverResults } from './discover-results';

type Props = {
  searchParams: Filters;
  type: 'movie' | 'tv';
};

export const Discover = async ({ searchParams, type }: Props) => {
  const url = getDiscoverUrlWithQueryParams(type, searchParams);
  const data = await queryTMDB<MovieResponse | TvShowsResponse>(url);

  if (data === undefined) {
    return <SomethingWentWrong />;
  }

  if ('statusText' in data) {
    return (
      <ErrorWithStatus status={data.status} statusText={data.statusText} />
    );
  }

  return (
    <>
      <div className='flex flex-wrap gap-6 place-content-center mx-auto px-6'>
        <DiscoverResults
          currentPage={searchParams.page ?? '1'}
          totalPage={data.total_pages}
          type={type}
          results={data.results}
        />
      </div>
    </>
  );
};
