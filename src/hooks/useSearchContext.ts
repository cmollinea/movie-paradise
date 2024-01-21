import { useContext } from 'react';
import { searchContext } from '../context';

export const useSearchContext = () => {
  const context = useContext(searchContext);

  if (!context) {
    throw new Error(
      'useSearchContext must be used within a SearcContextProvider'
    );
  }
  const { selected, setSelected } = context;

  return { selected, setSelected };
};
