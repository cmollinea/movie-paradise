import { BASE_URL, POSTER_SIZES } from '@/constants/image-url';
import { Image } from '@nextui-org/react';

type Props = {
  title: string;
  poster: string;
  isOverviewProvided?: boolean;
};

export const CardPoster = ({
  title,
  poster,
  isOverviewProvided = true
}: Props) => {
  return (
    <div className='col-span-3 flex place-content-center h-fit'>
      <Image
        alt={title}
        src={
          BASE_URL +
          (isOverviewProvided ? POSTER_SIZES.xs : POSTER_SIZES.xxs) +
          poster
        }
        width={isOverviewProvided ? 154 : 92}
        height={isOverviewProvided ? 231 : 138}
      />
    </div>
  );
};
