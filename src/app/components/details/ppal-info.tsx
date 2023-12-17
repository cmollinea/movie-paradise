'use client';
import { BASE_URL } from '@/app/constants/image-url';
import { GenreBadge, Progress } from '.';
import { Image } from '@nextui-org/react';
import { ActionButtons } from '../action-buttons';
import { useInfoContext } from '@/app/hooks';
import { usePathname } from 'next/navigation';

export function Details() {
  const {
    info: { info }
  } = useInfoContext();

  const pathame = usePathname();
  console.log(pathame);

  return (
    <div className='z-20 py-10 grid xl:grid-cols-12 xl:place-items-center xl:py-20 mx-h-fit relative max-md:gap-4'>
      <div className='xl:col-span-3 flex h-fit'>
        <Image
          alt={info?.title}
          height={450}
          width={300}
          src={BASE_URL + 'w300' + info?.poster}
          classNames={{
            wrapper:
              'max-sm:w-[185px] max-xl:w-[200px] max-xl:h-[300px] max-sm:h-[250px] max-w-[300px] max-h-[450px]'
          }}
        />
      </div>

      <div className='xl:col-span-9 xl:col-start-4 max-md:mt-8'>
        {info?.rating && <Progress value={info?.rating} />}
        <h1 className='mt-2 text-3xl md:text-5xl font-black md:max-w-2xl'>
          {info?.title}
        </h1>
        {info?.tagline && (
          <small>
            <em>{`"${info?.tagline}"`}</em>
          </small>
        )}
        <div className='flex max-md:inline-flex space-x-2 mt-2 max-md:overflow-auto max-md:w-[95vw] scrollbar-hide'>
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
        <p className='mt-4 w-full md:max-w-2xl'>{info?.overview} </p>
        {!(pathame.includes('collections') || pathame.includes('actors')) && (
          <ActionButtons />
        )}
      </div>
    </div>
  );
}
