import { useContext } from 'react';
import { tabBadgeContext } from '../context/profile-tab-badge-provider';

export const useTabBadgeContext = () => {
  const tabCtx = useContext(tabBadgeContext);

  if (!tabCtx) {
    throw new Error('');
  }

  const { total, setTotal } = tabCtx;
  return { total, setTotal };
};
