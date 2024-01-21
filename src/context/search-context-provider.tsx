'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { Target } from '../components/search-sidebar/target-button';

export type ISearchContext = {
  selected: Target;
  setSelected: Dispatch<SetStateAction<Target>>;
};

export const searchContext = createContext<ISearchContext | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};
export const SearchContextProvider = ({ children }: Props) => {
  const [selected, setSelected] = useState<Target>('movies');
  return (
    <searchContext.Provider value={{ selected, setSelected }}>
      {children}
    </searchContext.Provider>
  );
};
