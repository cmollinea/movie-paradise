import { useContext } from 'react';
import { buttonStatusContext } from '../context';

export const useButtonStatusContext = () => {
  const context = useContext(buttonStatusContext);
  if (!context) {
    throw new Error('useContext must be used within a provider');
  }

  const {
    buttonStatus: { isInFav, isInWatchList }
  } = context;
  return { isInFav, isInWatchList };
};
