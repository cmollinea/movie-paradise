'use client';
import { BASE_URL } from '@/app/constants/image-url';
import { GenreBadge, Progress } from '.';
import { Image } from '@nextui-org/react';
import { ServerButtonsWraper } from '../action-buttons';
import { useInfoContext } from '@/app/hooks';

function Details() {
  const {
    info: { info }
  } = useInfoContext();

  return (
    <div className='z-20 xl:grid px-4 py-10 md:grid xl:grid-cols-12 xl:place-items-center xl:py-20 max-w-fit mx-h-fit relative'>
      <Image
        alt={info?.title}
        height={450}
        width={300}
        src={BASE_URL + 'w300' + info?.poster}
        classNames={{
          wrapper:
            'max-sm:w-[185px] max-xl:w-[200px] max-xl:h-[300px] max-sm:h-[250px] col-span-3',
          img: ' w-full h-full'
        }}
      />

      <div className='xl:col-span-9 xl:col-start-4'>
        <Progress value={info?.rating} />
        <h1 className='mt-2 text-3xl md:text-5xl font-black'>{info?.title}</h1>
        <small>
          <em>{`"${info?.tagline}"`}</em>
        </small>
        <div className='flex space-x-2'>
          {info.genres?.map((genre) => (
            <GenreBadge key={genre.id}>{genre.name}</GenreBadge>
          ))}
        </div>
        <div className='flex space-x-2'>
          {info.country?.map((country) => (
            <span className='mt-2 text-lg font-bold' key={country.iso_3166_1}>
              {country.name}
            </span>
          ))}
        </div>
        <p className='tect-2xl mt-6 max-w-2xl'>{info?.overview} </p>
        <ServerButtonsWraper />{' '}
      </div>
    </div>
  );
}
export default Details;
