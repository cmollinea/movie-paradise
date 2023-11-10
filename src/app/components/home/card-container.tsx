'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export function CardContainer({ children }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const scrollTo = (side: 'right' | 'left') => {
    if (side === 'left') {
      containerRef.current?.scrollBy(-800, 0);
    }
    if (side === 'right') {
      containerRef.current?.scrollBy(800, 0);
    }
  };

  useEffect(() => {
    if (
      (containerRef.current?.scrollWidth as number) >
      (containerRef.current?.clientWidth as number)
    ) {
      setHasOverflow(true);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className='w-full p-1 py-4 inline-flex gap-10 overflow-x-auto max-sm:snap-x scroll-smooth horizontal-scrollbar'
    >
      <button
        className={`absolute active:scale-95 transition-all ease-in hover:bg-neutral-200/20 bg-neutral-200/10 rounded-full flex items-center place-content-center top-1/2 max-md:hidden p-1 left-4 ${
          hasOverflow ? '' : 'hidden'
        }`}
        onClick={() => scrollTo('left')}
      >
        <ChevronLeftIcon size={24} />
      </button>
      {children}
      <button
        className={`absolute active:scale-95 transition-all ease-in hover:bg-neutral-200/20 bg-neutral-200/10 rounded-full flex items-center place-content-center top-1/2 max-md:hidden p-1 right-4 ${
          hasOverflow ? '' : 'hidden'
        }`}
        onClick={() => scrollTo('right')}
      >
        <ChevronRightIcon size={24} />
      </button>
    </div>
  );
}
