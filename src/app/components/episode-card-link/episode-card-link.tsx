import { BASE_URL } from '@/app/constants/image-url';
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import Link from 'next/link';

type Props = {
  episodeNumber: number;
  name: string;
  image: string;
  href: string;
};

export const EpisodeCardLink = ({
  episodeNumber,
  name,
  image,
  href
}: Props) => {
  return (
    <Link
      href={href}
      className='border border-transparent hover:border-primary-400 transition-colors ease-soft-spring rounded-xl overflow-hidden'
    >
      <Card
        radius='md'
        className='max-w-lg w-full grid grid-cols-6 bg-neutral-100/10 backdrop-blur-md'
      >
        <CardHeader className='col-span-2'>
          <Image
            width={185}
            height={104}
            src={BASE_URL + 'w185' + image}
            alt={name + 'poster'}
          />
        </CardHeader>
        <div className='col-span-4 w-full h-full relative'>
          {' '}
          <CardBody>
            <h6 className='text-lg font-bold'>Episode {episodeNumber}</h6>
            <p className='text-xs md:text-medium font-semibold'>
              <i>{name}</i>
            </p>
          </CardBody>
        </div>
      </Card>
    </Link>
  );
};
