'use client';

import { filters } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

type VoteCountContext = {
  voteCount: number;
  setVoteCount: Dispatch<SetStateAction<number>>;
};

export const voteCountContext = createContext<VoteCountContext | null>(null);

type Props = {
  children: React.ReactNode;
};

export const VoteCountSliderProvider = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const voteCountGte = searchParams.get(filters.vote_count_gte);
  const [voteCount, setVoteCount] = useState(
    voteCountGte ? parseInt(voteCountGte) : 0
  );

  return (
    <voteCountContext.Provider value={{ voteCount, setVoteCount }}>
      {children}
    </voteCountContext.Provider>
  );
};
