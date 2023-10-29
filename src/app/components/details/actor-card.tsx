'use client';
import { BASE_URL } from '@/app/constants/image-url';
import { Card, CardFooter, Image } from '@nextui-org/react';

type Props = {
  name: string;
  src: string | null;
};

function ActorCard({ src, name }: Props) {
  return (
    <Card className='min-w-[154px]'>
      <Image
        src={BASE_URL + 'w154' + src}
        alt={name}
        height={231}
        width={154}
      />
      <CardFooter>
        <p className='w-full truncate'>{name}</p>
      </CardFooter>
    </Card>
  );
}
export default ActorCard;
