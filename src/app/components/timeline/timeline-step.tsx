import { ArrowRightCircleIcon, Star } from 'lucide-react';
import Link from 'next/link';
import { MediaType } from 'root/types/person-details';
import { GenreBadge } from '../details';

type Props = {
  year: string;
  mediaTitle: string;
  mediaType: MediaType;
  id: number;
  rate: number;
};

export const TimeLineStep = ({
  year,
  mediaTitle,
  mediaType,
  id,
  rate
}: Props) => {
  return (
    <li className='flex items-center gap-2 w-fit'>
      <span className='h-6 md:h-10 w-6 md:w-10 rounded-full text-foreground-300 border-primary-400 border bg-background text-center text-[8px] md:text-xs flex items-center place-content-center'>
        {year}
      </span>

      <span className='max-md:text-xs flex items-center space-x-2 text-foreground-100'>
        <GenreBadge
          variant='dot'
          color={rate > 8 ? 'success' : rate > 5 ? 'primary' : 'warning'}
        >
          <Star fill='white' size={16} />
          <b role='contentinfo' className='text-foreground-300'>
            {rate.toFixed(1)}
          </b>
        </GenreBadge>{' '}
        <Link
          href={`/${mediaType === 'tv' ? mediaType : 'movies'}/${id}`}
          className='max-sm:max-w-[250px] max-xl:max-w-[300px] max-xl:truncate underline hover:text-secondary-400 transition-colors ease-in-out peer visited:text-primary-600'
        >
          {mediaTitle}
        </Link>
        <ArrowRightCircleIcon
          size={16}
          className=' peer-hover:translate-x-1 peer-hover:text-secondary-400 transition-all ease-in-out'
        />
      </span>
    </li>
  );
};
