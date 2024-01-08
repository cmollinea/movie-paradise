import { useContext } from 'react';
import { voteCountContext } from '../context/vote-count-provider';

export const useVoteCountContext = () => {
  const voteCountCtx = useContext(voteCountContext);
  if (!voteCountCtx) {
    throw new Error();
  }
  return voteCountCtx;
};
