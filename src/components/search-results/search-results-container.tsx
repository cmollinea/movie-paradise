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
import { CardWrapper } from '../card-link-with-description/card-wrapper';
import { CardInfoContainer } from '../card-link-with-description/card-info-container';
import { CardPoster } from '../card-link-with-description/card-poster';
import { CardInfo } from '../card-link-with-description/card-info';
import { Star } from 'lucide-react';

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
      <ActorCard
        name={person.name}
        src={person.profile_path}
        key={person.id}
        id={person.id}
      />
    ));
  } else {
    const results = (
      data as MovieResponse | TvShowsResponse | CollectionResponse
    ).results;

    node = results.map((item) => {
      const link = `${type}/${item.id}`;
      const title = 'name' in item ? item.name : item.title;
      const rating = 'vote_average' in item ? item.vote_average : 0;

      return (
        <CardWrapper
          key={item.id}
          title={title}
          link={link}
          backdrop={item.backdrop_path || ''}
        >
          <CardInfoContainer>
            <CardPoster title={title} poster={item.poster_path} />
            <CardInfo>
              <p className='text-xl lg:text-3xl truncate'>
                <b>{title}</b>
              </p>
              {rating > 0 && (
                <span className='flex space-x-0.5 items-center md:text-2xl font-extrabold'>
                  <Star className=' fill-primary-400 stroke-primary-400 h-4 w-4 md:h-6 md:w-6' />
                  {rating && <span>{rating.toFixed(1)}</span>}
                </span>
              )}
              <p className='max-lg:text-xs'>
                <i>{item.overview || 'No info Provided'}</i>
              </p>
            </CardInfo>
          </CardInfoContainer>
        </CardWrapper>
      );
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
