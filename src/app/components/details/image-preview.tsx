'use client';
import { BASE_URL } from '@/app/constants/image-url';
import { Card, Image } from '@nextui-org/react';
import Progress from './votes';

type Props = {
  image: string;
  votes: number;
  type: 'poster' | 'backdrop';
};

function ImagePreview({ image, votes, type }: Props) {
  const src = BASE_URL + (type === 'backdrop' ? 'w300' : 'w154') + image;

  return (
    <Image
      removeWrapper
      alt={image}
      src={src}
      width={type === 'backdrop' ? 300 : 154}
      height={type === 'backdrop' ? 169 : 231}
      className='w-full h-full object-cover'
      classNames={{
        img: 'h-full w-full'
      }}
    />
    // <span className='absolute bottom-0 right-4'>
    //   <Progress value={votes} />
    // </span>
  );
}
export default ImagePreview;
