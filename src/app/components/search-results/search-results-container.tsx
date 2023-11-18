'use client';

import { useSearchContext } from '@/app/hooks/useSearchContext';

import {
  CollectionResponse,
  MovieResponse,
  PeopleResponse,
  TvShowsResponse
} from 'root/types';
import { CardLink } from '../home';
import { ActorCard } from '../details';
import { ApiError } from '@/app/services';
import { ErrorWithStatus, SomethingWentWrong } from '../error';
import { Target } from '../search-sidebar/target-button';
import { Pagination } from '../global-ui/pagination';

type Props = {
  data:
    | MovieResponse
    | TvShowsResponse
    | CollectionResponse
    | PeopleResponse
    | ApiError
    | undefined;
  type: Target;
};

export const SearchResultsContainer = ({ data, type }: Props) => {
  let node: React.ReactNode;

  if (data === undefined) {
    node = <SomethingWentWrong />;
    return;
  }

  if ('status' in data) {
    node = (
      <ErrorWithStatus status={data.status} statusText={data.statusText} />
    );
    return;
  }

  if (type === 'people') {
    const people = (data as PeopleResponse).results;

    node = people.map((person) => (
      <ActorCard name={person.name} src={person.profile_path} key={person.id} />
    ));
  } else {
    const results = (
      data as MovieResponse | TvShowsResponse | CollectionResponse
    ).results;

    node = results.map((item) => (
      <CardLink
        type={type}
        imageSizes='poster'
        element={{
          id: item.id,
          name: 'name' in item ? item.name : item.title,
          poster_path: item.poster_path,
          rating: 'vote_average' in item ? item.vote_average : undefined
        }}
        key={item.id}
      />
    ));
  }

  return (
    <>
      <Pagination total={data.total_pages} />
      <ul className='w-full flex flex-wrap gap-6 container'>{node}</ul>
    </>
  );
};
