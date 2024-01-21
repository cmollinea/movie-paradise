'use client';

import { filters } from '@/app/constants';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

type Range = [number, number];

type VoteAverageContext = {
  voteRange: Range;
  setVoteRange: Dispatch<SetStateAction<Range>>;
};

export const voteAverageContext = createContext<VoteAverageContext | null>(
  null
);

type Props = {
  children: React.ReactNode;
};

export const VoteAverageSliderProvider = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const voteAverageGte = searchParams.get(filters.vote_average_gte);
  const voteAverageLte = searchParams.get(filters.vote_average_lte);
  const [voteRange, setVoteRange] = useState<Range>([
    voteAverageGte ? parseInt(voteAverageGte) : 0,
    voteAverageLte ? parseInt(voteAverageLte) : 10
  ]);

  return (
    <voteAverageContext.Provider value={{ voteRange, setVoteRange }}>
      {children}
    </voteAverageContext.Provider>
  );
};
