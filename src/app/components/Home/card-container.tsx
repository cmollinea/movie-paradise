'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRef } from 'react';

type Props = {
  children: React.ReactNode;
};

function CardContainer({ children }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (side: 'right' | 'left') => {
    if (side === 'left') {
      containerRef.current?.scrollBy(-800, 0);
    }
    if (side === 'right') {
      containerRef.current?.scrollBy(800, 0);
    }
  };
  return (
    <div
      ref={containerRef}
      className='w-full p-1 inline-flex gap-10 overflow-x-scroll max-sm:snap-x scroll-smooth scrollbar-hide fancy-scrollbar'
    >
      <button
        className='absolute top-40 bg-red-500 p-2 left-0'
        onClick={() => scrollTo('left')}
      >
        <ChevronLeftIcon size={20} />
      </button>
      {children}
      <button
        className='absolute top-40 bg-red-500 p-2 right-0'
        onClick={() => scrollTo('right')}
      >
        <ChevronRightIcon size={20} />
      </button>
    </div>
  );
}
export default CardContainer;
