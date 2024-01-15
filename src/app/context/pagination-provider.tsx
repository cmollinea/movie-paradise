'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

type PaginationContext = {
  total: number;
  current: string;
  setPages: Dispatch<
    SetStateAction<{
      total: number;
      current: string;
    }>
  >;
};

export const paginationContext = createContext<PaginationContext | null>(null);

export const PaginationProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [pages, setPages] = useState({ total: 0, current: '1' });
  return (
    <paginationContext.Provider
      value={{ total: pages.total, current: pages.current, setPages }}
    >
      {children}
    </paginationContext.Provider>
  );
};
