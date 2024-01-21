import { useContext } from 'react';
import { sortByContext } from '../context/sort-select-provider';

export const useSortByContext = () => {
  const sortByCtx = useContext(sortByContext);
  if (!sortByCtx) {
    throw new Error('You missing the provider');
  }

  return sortByCtx;
};
