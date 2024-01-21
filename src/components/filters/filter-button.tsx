'use client';

import { useFilters } from '@/app/hooks';
import { Button } from '@nextui-org/react';

export const FilterButton = () => {
  const { handleFilter } = useFilters();

  return (
    <div className='px-2 mt-4'>
      <Button
        onClick={handleFilter}
        variant='shadow'
        size='lg'
        className='w-full bg-gradient-to-r from-secondary-400 to-primary-400 backdrop-blur-2xl font-bold text-lg'
      >
        Search
      </Button>
    </div>
  );
};
