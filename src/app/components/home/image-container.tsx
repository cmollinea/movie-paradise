'use client';
import { BASE_URL } from '@/app/constants/image-url';
import { Image, Card } from '@nextui-org/react';
import { ImageSizes } from 'root/types';

type Props = {
  image: string;
  imageSizes: ImageSizes;
  children?: React.ReactNode;
};

export function ImageContainer({ image, imageSizes, children }: Props) {
  const src = BASE_URL + (imageSizes === 'backdrop' ? 'w300' : 'w154') + image;

  return (
    <Card
      isPressable
      className='w-fit h-fit overflow-hidden flex flex-none max-sm:snap-center max-sm:snap-always'
      radius='md'
    >
      <Image
        isBlurred
        alt={image}
        src={src}
        width={imageSizes === 'backdrop' ? 300 : 154}
        height={imageSizes === 'backdrop' ? 169 : 231}
        className={`h-full object-cover border border-neutral-100/20 ${
          imageSizes === 'backdrop'
            ? 'max-md:max-w-[200px]'
            : 'max-md:max-w-[120px]'
        }`}
      />
      {children}
    </Card>
  );
}