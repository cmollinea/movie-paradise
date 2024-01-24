'use client';
import { BASE_URL, NOT_FOUND } from '@/constants/image-url';
import { Image, Card } from '@nextui-org/react';
import { ImageSizes } from 'root/types';

type Props = {
  image: string | null;
  imageSizes: ImageSizes;
  children?: React.ReactNode;
};

export function ImageContainer({ image, imageSizes, children }: Props) {
  const src = BASE_URL + (imageSizes === 'backdrop' ? 'w300' : 'w154') + image;

  return (
    <Card
      className='w-fit h-fit overflow-hidden flex flex-none max-sm:snap-center max-sm:snap-always'
      radius='md'
    >
      <Image
        isBlurred
        src={image ? src : NOT_FOUND}
        alt={'poster'}
        width={imageSizes === 'backdrop' ? 300 : 154}
        height={imageSizes === 'backdrop' ? 169 : 231}
        className={`${
          imageSizes === 'backdrop'
            ? 'max-md:max-w-[200px]'
            : 'max-md:max-w-[120px]'
        } ${
          !image && imageSizes === 'poster' ? 'min-h-[231px]' : 'min-h-[169px]'
        } h-full`}
      />
      {children}
    </Card>
  );
}
