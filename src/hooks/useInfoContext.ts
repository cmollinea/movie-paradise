import { useContext } from 'react';
import { infoContext } from '../context/info-context-provider';

export function useInfoContext() {
  const info = useContext(infoContext);
  return { info };
}
