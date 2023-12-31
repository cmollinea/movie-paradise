import { BASE_URL } from '@/app/constants/image-url';
import { Image } from '@nextui-org/react';
import { Star } from 'lucide-react';
import Link from 'next/link';
import type { MediaType } from 'root/types';

type Props = {
  media: {
    backdrop?: string | null;
    description: string;
    id?: number;
    mediaType: MediaType;
    poster: string;
    rating?: number;
    title: string;
    seasonLink?: string;
    seasonNumber?: string;
  };
};
const CardLinkWithDescription = ({ media }: Props) => {
  const {
    backdrop,
    description,
    id,
    mediaType,
    poster,
    rating,
    title,
    seasonLink
  } = media;

  return (
    <Link
      prefetch={false}
      title={title}
      href={seasonLink ? seasonLink : id ? `/${mediaType}/${id}` : '/'}
      className='relative w-full max-w-4xl bg-cover bg-center group border border-background max-lg:border-foreground-800 overflow-hidden rounded-md hover:border-primary-400 lg:hover:-translate-y-0.5 transition-all active:scale-[0.99] ease-in-out'
      style={
        backdrop ? { backgroundImage: `url(${BASE_URL}w780${backdrop})` } : {}
      }
    >
      <div
        className={`absolute top-0 bottom-0 left-o right-0 bg-background ${
          backdrop && 'transition-opacity ease-in-out group-hover:opacity-60'
        }  z-10 w-full h-full`}
      ></div>
      <div className='relative grid grid-cols-12 gap-4 z-20 p-4'>
        <div className='col-span-3 flex place-content-center h-fit'>
          <Image
            alt={title}
            src={BASE_URL + 'w154' + poster}
            width={154}
            height={231}
            className=''
          />
        </div>
        <div className='col-span-9 grid gap-2 h-fit'>
          <p className='text-xl lg:text-3xl truncate'>
            <b>{title}</b>
          </p>
          {rating && (
            <span className='flex space-x-0.5 items-center md:text-2xl font-extrabold'>
              <Star className=' fill-primary-400 stroke-primary-400 h-4 w-4 md:h-6 md:w-6' />
              {rating && <span>{rating.toFixed(1)}</span>}
            </span>
          )}
          <p className='max-lg:text-xs'>
            <i>{description}</i>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardLinkWithDescription;
