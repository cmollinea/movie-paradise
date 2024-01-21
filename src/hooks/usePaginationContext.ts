import { useContext } from 'react';
import { paginationContext } from '../context/pagination-provider';

export const usePaginationContext = () => {
  const paginationCtx = useContext(paginationContext);

  if (!paginationCtx) {
    throw new Error('');
  }
  return { paginationCtx };
};
