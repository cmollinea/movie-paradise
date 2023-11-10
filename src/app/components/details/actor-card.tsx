'use client';
import { BASE_URL } from '@/app/constants/image-url';
import { Card, CardFooter, Image } from '@nextui-org/react';

type Props = {
  name: string;
  src: string | null;
};

export function ActorCard({ src, name }: Props) {
  return (
    <Card className='flex-none max-sm:max-w-[120px]'>
      <Image
        src={BASE_URL + 'w154' + src}
        alt={name}
        height={231}
        width={154}
        className='max-sm:max-w-[120px] max-sm:max-h-[150px]'
      />
      <CardFooter>
        <p className='w-full truncate'>{name}</p>
      </CardFooter>
    </Card>
  );
}
