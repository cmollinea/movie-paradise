'use client';

import { usePaginationContext } from '@/app/hooks/usePaginationContext';
import { Pagination } from '../global-ui';

export const NotSuspendedPagination = () => {
  const {
    paginationCtx: { total, current }
  } = usePaginationContext();

  if (total > 0) {
    return <Pagination total={total} currentPage={current} />;
  }

  return null;
};
