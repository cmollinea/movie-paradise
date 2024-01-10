import { getDiscoverUrlWithQueryParams } from '@/app/helpers';
import { Filters } from 'root/types/discover-types';

type Props = {
  searchParams: Filters;
};

const Movies = ({ searchParams }: Props) => {
  const url = getDiscoverUrlWithQueryParams('movie', searchParams);
  console.log(url);
  return <div>Movies</div>;
};
export default Movies;
