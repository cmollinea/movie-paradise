import {
  CollectionResponse,
  MovieResponse,
  PeopleResponse,
  TvShowsResponse
} from 'root/types';
import { useSearchContext } from '@/app/hooks/useSearchContext';
import { pickSearchResultsType } from '@/app/helpers/pickSearchResultsType';

type Props = {
  results: {
    movies: MovieResponse;
    tv: TvShowsResponse;
    collections: CollectionResponse;
    people: PeopleResponse;
  };
};

export const SearchResults = ({ results }: Props) => {
  const { selected } = useSearchContext();
  const data = pickSearchResultsType(selected, results[selected]);
};
