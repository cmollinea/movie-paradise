import { useContext } from 'react';
import { voteAverageContext } from '../context/vote-average-slider-provider';

export const useVoteAverageContext = () => {
  const voteAverageCtx = useContext(voteAverageContext);
  if (!voteAverageCtx) {
    throw new Error();
  }
  return voteAverageCtx;
};
