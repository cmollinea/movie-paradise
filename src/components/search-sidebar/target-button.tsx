'use client';

import { useSearchContext } from '@/app/hooks/useSearchContext';
import { Button } from '@nextui-org/react';
import { ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

//Todo Mover esto a tipos
export type Target = 'movies' | 'collections' | 'tv' | 'people';

type Props = {
  resultsCount: number;
  target: Target;
  children: React.ReactNode;
};

export const TargetButtonLink = ({ resultsCount, target, children }: Props) => {
  const searchParams = useSearchParams();
  const currentTarget = searchParams.get('target') || 'movies';
  const router = useRouter();
  const path = usePathname();

  const isSelected = currentTarget === target;

  const handleSelectNewTarget = (target: string) => {
    const _searchParams = new URLSearchParams(searchParams);
    _searchParams.set('target', target);
    _searchParams.set('page', '1');
    router.push(path + '?' + _searchParams.toString());
  };

  return (
    <Button
      onClick={() => handleSelectNewTarget(target)}
      size='lg'
      variant={isSelected ? 'solid' : 'bordered'}
      color={isSelected ? 'primary' : 'secondary'}
      className='w-56 max-lg:w-20 max-lg:h-8 max-lg:text-xs max-lg:snap-normal flex-none'
    >
      <p className={`flex items-center gap-1 ${resultsCount && 'font-bold'}`}>
        {resultsCount > 0 && resultsCount} {children}
        <span className='flex items-center absolute right-2'>
          <ChevronRight
            size={24}
            className={isSelected ? 'max-lg:hidden' : 'hidden'}
          />
        </span>
      </p>
    </Button>
  );
};
