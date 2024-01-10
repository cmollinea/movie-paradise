'use client';

import { useSearchParams } from 'next/navigation';
import { filters } from '../constants';
import { createContext } from 'react';
import { useState } from 'react';

type SortContext = {
  sortFilter: string | null;
  handleSelectSortFilter: (filter: string) => void;
};

export const sortByContext = createContext<SortContext | null>(null);

type Props = {
  children: React.ReactNode;
};

export const SortSelectProvider = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const sortedBy = searchParams.get(filters.sort_by);

  const [sortFilter, setSortFilter] = useState(sortedBy || '');

  const handleSelectSortFilter = (filter: string) => {
    setSortFilter(filter);
  };
  return (
    <sortByContext.Provider value={{ sortFilter, handleSelectSortFilter }}>
      {children}
    </sortByContext.Provider>
  );
};
