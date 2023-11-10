'use client';
import { BASE_URL } from '@/app/constants/image-url';

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
};

export function Backdrop({ src, alt, children }: Props) {
  return (
    <section
      className='w-full relative grid overflow-hidden justify-center bg-cover bg-top xl:h-[600px] max-md:min-h-screen'
      style={{ backgroundImage: `url(${BASE_URL + 'original' + src})` }}
    >
      <span className='absolute inset-0 z-10 bg-black/80 backdrop-blur-[1px]'></span>

      {children}
    </section>
  );
}
