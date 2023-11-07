'use client';

import Link from 'next/link';
import { Image, Card, CardFooter } from '@nextui-org/react';
import { Star } from 'lucide-react';

type Props = {
  element: {
    id: number;
    name: string;
    rating: number;
    poster_path: string;
  };
  type: 'tv' | 'movies';
};

function CardLink({ element, type }: Props) {
  const { id, name, rating, poster_path } = element;
  return (
    <Link
      href={`/${type}/${id}`}
      className='flex flex-none max-sm:snap-center max-sm:snap-always overflow-hidden rounded-xl relative border border-transparent hover:border-primary-400 transition-colors ease-in-out group'
    >
      <Card
        isPressable
        className='w-full col-span-12 sm:col-span-7'
        radius='none'
      >
        <Image
          removeWrapper
          className='z-0 w-full object-cover'
          alt={`${name} Poster`}
          height={231}
          isZoomed
          isBlurred
          sizes='sm'
          radius='none'
          src={'https://image.tmdb.org/t/p/w154' + poster_path}
          width={154}
        />
        <CardFooter className='absolute bg-gradient-to-t from-black to-transparent rounded-none bottom-0 p-0 z-10 translate-y-28 group-hover:translate-y-0 transition-transform ease-in-out'>
          <div className='bg-gradient-to-t from-black to-transparent w-full h-28 p-2 flex flex-col place-content-center'>
            <p className=' font-bold text-xl truncate text-start text-primary-400'>
              {name}
            </p>
            <p className='flex space-x-2 items-center text-2xl font-extrabold'>
              <Star
                size={24}
                className=' fill-primary-400 stroke-primary-400'
              />
              {rating}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
export default CardLink;
