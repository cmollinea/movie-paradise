import { useContext } from 'react';
import { infoContext } from '../context/info-context-provider';

function useInfoContext() {
  const info = useContext(infoContext);
  return { info };
}
export default useInfoContext;
