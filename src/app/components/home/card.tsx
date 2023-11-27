import Link from 'next/link';
import { CardFooter } from '@nextui-org/react';
import { Star } from 'lucide-react';
import { ImageContainer } from '.';
import { ImageSizes } from 'root/types';

type Props = {
  element: {
    id: number;
    name: string;
    rating?: number;
    poster_path: string | null;
  };
  type: 'tv' | 'movies' | 'collections';
  imageSizes: ImageSizes;
};

export function CardLink({ element, type, imageSizes }: Props) {
  const { id, name, rating, poster_path } = element;
  return (
    <Link
      prefetch={false}
      href={`/${type}/${id}`}
      className='flex-none max-sm:max-w-[120px] transition-colors ease-in-out group w-fit h-fit'
    >
      <ImageContainer image={poster_path || ''} imageSizes={imageSizes}>
        <CardFooter className='absolute bg-gradient-to-t from-black to-transparent rounded-none bottom-0 p-0 z-10 md:opacity-0 group-hover:opacity-100 transition-opacity ease-in-out'>
          <div className='bg-gradient-to-t from-black to-transparent w-full max-md:py-4 md:h-28 p-2 flex flex-col place-content-center'>
            <p className=' font-bold text-sm truncate text-start text-primary-400'>
              {name}
            </p>
            <p className='flex space-x-0.5 items-center md:text-2xl font-extrabold'>
              <Star className=' fill-primary-400 stroke-primary-400 h-4 w-4 md:h-6 md:w-6' />
              {rating && <span>{rating.toFixed(1)}</span>}
            </p>
          </div>
        </CardFooter>
      </ImageContainer>
    </Link>
  );
}
