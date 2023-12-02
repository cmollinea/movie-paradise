'use client';
import { BASE_URL } from '@/app/constants/image-url';
import { Card, CardFooter, Image } from '@nextui-org/react';

type Props = {
  name: string;
  src: string | null;
};

export function ActorCard({ src, name }: Props) {
  return (
    <Card className='flex-none relative max-sm:max-w-[120px]'>
      <Image
        src={BASE_URL + 'w154' + src}
        alt={name}
        height={231}
        width={154}
        className='max-sm:max-w-[100px] max-sm:max-h-[120px]'
      />
      <CardFooter className='absolute z-10 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent'>
        <p className='w-full truncate font-bold text-foreground-300 max-sm:text-xs pt-2 pb-1'>
          {name}
        </p>
      </CardFooter>
    </Card>
  );
}
