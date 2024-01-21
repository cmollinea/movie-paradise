import { Backdrop, Details } from '@/components/details';
import { CardInfo } from '@/components/card-link-with-description/card-info';
import {
  CardInfoContainer,
  CardWrapper,
  CardPoster
} from '@/components/card-link-with-description';
import { CollectionDetails } from 'root/types/collection-details';
import { ErrorWithStatus, SomethingWentWrong } from '@/components/error';
import { getTMDBEndpoint } from '@/helpers';
import { Info } from 'root/types';
import { InfoContextProvider } from '@/context';
import { MEDIA_TYPES } from '@/constants';
import { queryTMDB } from '@/services';
import { Section } from '@/components/global-ui';
import { Star } from 'lucide-react';

type Props = {
  params: {
    id: string;
  };
};

const Collection = async ({ params }: Props) => {
  const id = params.id;
  const endpoint = getTMDBEndpoint(id, 'collection');
  const collectionDetails = await queryTMDB<CollectionDetails>(endpoint);

  if (collectionDetails === undefined) {
    return <SomethingWentWrong />;
  }

  if ('statusText' in collectionDetails) {
    return (
      <ErrorWithStatus
        status={collectionDetails.status}
        statusText={collectionDetails.statusText}
      />
    );
  }

  const info: Partial<Info> = {
    id: id,
    overview: collectionDetails.overview,
    poster: collectionDetails.poster_path,
    title: collectionDetails.name
  };

  return (
    <section className='w-full'>
      <Backdrop src={collectionDetails.backdrop_path}>
        <InfoContextProvider info={info} mediaType={MEDIA_TYPES.movies}>
          <Details />
        </InfoContextProvider>
      </Backdrop>
      <Section>
        <ul className='w-full grid gap-6 max-lg:px-4'>
          {collectionDetails.parts.map((movie, index) => {
            return (
              <CardWrapper
                key={movie.id}
                title={movie.title}
                link={`/movies/${id}`}
                backdrop={movie.backdrop_path || ''}
                classname=' max-w-full'
              >
                <CardInfoContainer>
                  <CardPoster title={movie.title} poster={movie.poster_path} />
                  <CardInfo>
                    <p className='text-lg '>Movie #{index + 1}</p>
                    <p className='text-xl lg:text-3xl truncate'>
                      <b>{movie.title}</b>
                    </p>
                    {movie.vote_average && (
                      <span className='flex space-x-0.5 items-center md:text-2xl font-extrabold'>
                        <Star className=' fill-primary-400 stroke-primary-400 h-4 w-4 md:h-6 md:w-6' />
                        <span>{movie.vote_average.toFixed(1)}</span>
                      </span>
                    )}
                    <p className='max-lg:text-xs'>
                      <i>{movie.overview || 'No info Provided'}</i>
                    </p>
                  </CardInfo>
                </CardInfoContainer>
              </CardWrapper>
            );
          })}
        </ul>
      </Section>
    </section>
  );
};

export default Collection;
