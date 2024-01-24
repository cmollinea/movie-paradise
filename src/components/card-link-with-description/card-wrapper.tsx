import { BACKDROP_SIZES, BASE_URL } from '@/constants/image-url';
import Link from 'next/link';

type Props = {
  title: string;
  link: string;
  backdrop?: string;
  children: React.ReactNode;
  classname?: string;
};

export const CardWrapper = ({
  title,
  link,
  backdrop,
  children,
  classname
}: Props) => {
  return (
    <Link
      prefetch={false}
      title={title}
      href={link}
      className={`relative w-full max-w-4xl bg-cover bg-center group border border-background max-lg:border-foreground-800 overflow-hidden rounded-md hover:border-primary-400 lg:hover:-translate-y-0.5 transition-all active:scale-[0.99] ease-in-out ${
        classname ? classname : ''
      }`}
      style={
        backdrop
          ? {
              backgroundImage: `url(${BASE_URL + BACKDROP_SIZES.md}${backdrop})`
            }
          : {}
      }
    >
      {backdrop && (
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 bg-background transition-opacity ease-in-out group-hover:opacity-60 z-10 w-full h-full`}
        ></div>
      )}
      {children}
    </Link>
  );
};
