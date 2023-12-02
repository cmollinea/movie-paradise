'use client';
import { ActorCard } from '../details';
import { ApiError } from '@/app/services';
import { ErrorWithStatus, SomethingWentWrong } from '../error';
import { Pagination } from '../global-ui/pagination';
import { Target } from '../search-sidebar/target-button';
import { useSearchParams } from 'next/navigation';
import CardLinkWithDescription from '../global-ui/card-link-with-description';

import type {
  CollectionResponse,
  MovieResponse,
  PeopleResponse,
  TvShowsResponse
} from 'root/types';

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
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

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

    node = results.map((item) => {
      const media = {
        backdrop: item.backdrop_path,
        description: item.overview,
        id: item.id,
        mediaType: type,
        poster: item.poster_path,
        rating: 'vote_average' in item ? item.vote_average : 0,
        title: 'name' in item ? item.name : item.title
      };

      return <CardLinkWithDescription media={media} key={item.id} />;
    });
  }

  return (
    <>
      {data.total_pages > 1 && (
        <Pagination total={data.total_pages} currentPage={currentPage} />
      )}
      <ul className='w-full flex flex-wrap gap-6 container max-lg:px-4'>
        {node}
      </ul>
      {data.total_pages > 1 && (
        <Pagination total={data.total_pages} currentPage={currentPage} />
      )}
    </>
  );
};
