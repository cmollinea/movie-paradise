'use client';
import { Card, Image } from '@nextui-org/react';
import { BASE_URL } from '@/app/constants/image-url';

type Props = {
  similar: {
    title: string;
    backdrop: string | null;
    id: number;
    rating: number;
  };
};

export function ClientSimilar({ similar }: Props) {
  return (
    <Card
      radius='md'
      isPressable
      key={similar.id}
      className='w-fit h-fit overflow-hidden flex-none max-sm:snap-center max-sm:snap-always'
    >
      <Image
        isBlurred
        alt={similar.title + 'poster'}
        src={BASE_URL + 'w300' + similar.backdrop}
        width={300}
        height={154}
        className='w-full object-cover'
      />
    </Card>
  );
}
