'use client';
import { BASE_URL } from '@/constants/image-url';
import { Image, Card } from '@nextui-org/react';

type Props = {
  image: string;
  type: 'poster' | 'backdrop';
};

export function ImagePreview({ image, type }: Props) {
  const src = BASE_URL + (type === 'backdrop' ? 'w300' : 'w154') + image;

  return (
    <Card
      isPressable
      className='w-fit h-fit overflow-hidden flex flex-none max-sm:snap-center max-sm:snap-always max-md:max-w-[200px]'
      radius='md'
    >
      <Image
        isBlurred
        alt={image}
        src={src}
        width={type === 'backdrop' ? 300 : 154}
        height={type === 'backdrop' ? 169 : 231}
        className='h-full object-cover border border-neutral-100/20'
      />
    </Card>
  );
}
