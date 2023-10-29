'use client';
import { BASE_URL } from '@/app/constants/image-url';
import { Image } from '@nextui-org/react';
import { Genre, ProductionCountry } from '../../../../types/movie-details';
import GenreBadge from './badge';
import Progress from './votes';

type Props = {
  info: {
    title: string;
    poster: string;
    rating: number;
    genres: Genre[];
    country: ProductionCountry[];
    overview: string;
    tagline: string;
  };
};

function Details({ info }: Props) {
  const { title, poster, rating, genres, country, overview, tagline } = info;
  return (
    <div className='z-20 xl:grid px-4 py-10 md:grid xl:grid-cols-12 xl:place-items-center lg:px-20 xl:px-40 xl:py-20 max-w-fit mx-h-fit relative'>
      <Image
        alt={title}
        height={450}
        width={300}
        src={BASE_URL + 'w300' + poster}
        className=''
        classNames={{
          wrapper:
            ' max-sm:w-[185px] max-xl:w-[200px] max-xl:h-[300px] max-sm:h-[250px] col-span-3',
          img: ' w-full h-full'
        }}
      />
      <div className='xl:col-span-9 xl:col-start-4'>
        <Progress value={rating} />
        <h1 className='mt-2 text-3xl md:text-5xl font-black'>{title}</h1>
        <small>
          <em>{`"${tagline}"`}</em>
        </small>
        <div className='flex space-x-2'>
          {genres.map((genre) => (
            <GenreBadge key={genre.id}>{genre.name}</GenreBadge>
          ))}
        </div>
        <div className='flex space-x-2'>
          {country.map((country) => (
            <span className='mt-2 text-lg font-bold' key={country.iso_3166_1}>
              {country.name}
            </span>
          ))}
        </div>
        <p className='tect-2xl mt-6 max-w-2xl'>{overview} </p>
      </div>
    </div>
  );
}
export default Details;
