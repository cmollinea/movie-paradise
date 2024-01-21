import { BASE_URL } from '@/app/constants/image-url';
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import Link from 'next/link';

type Props = {
  image: string;
  href: string;
  children: React.ReactNode;
};

export const EpisodeCardLink = ({ image, href, children }: Props) => {
  return (
    <Link
      href={href}
      className='border border-transparent hover:border-primary-400 transition-colors ease-soft-spring rounded-xl overflow-hidden'
    >
      <Card
        radius='md'
        className='max-w-lg w-full grid grid-cols-6 bg-neutral-100/10 backdrop-blur-md h-full'
      >
        <CardHeader className='col-span-2'>
          <Image
            width={185}
            height={104}
            src={BASE_URL + 'w185' + image}
            alt={'poster'}
          />
        </CardHeader>
        <div className='col-span-4 w-full h-full relative'>
          {' '}
          <CardBody>{children}</CardBody>
        </div>
      </Card>
    </Link>
  );
};
