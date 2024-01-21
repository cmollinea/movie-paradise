'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type TabBadgeContext = {
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
};

export const tabBadgeContext = createContext<TabBadgeContext | null>(null);

export const ProfileTabBadgeProvider = ({ children }: Props) => {
  const [total, setTotal] = useState(0);
  return (
    <tabBadgeContext.Provider value={{ total, setTotal }}>
      {children}
    </tabBadgeContext.Provider>
  );
};
