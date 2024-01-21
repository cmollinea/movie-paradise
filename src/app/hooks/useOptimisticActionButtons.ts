'use client';
import { useOptimistic, useState } from 'react';
import { useButtonStatusContext } from '.';

export const useOptimisticActionButtons = () => {
  const { isInFav, isInWatchList } = useButtonStatusContext();
  console.log('LLega', isInFav, isInWatchList);

  const [reactiveIsInFav, setReactiveIsInFav] = useState(isInFav);
  const [reactiveIsInWatchList, setReactiveIsInWatchList] =
    useState(isInWatchList);

  const [optimisticFav, addOptimisticFav] = useOptimistic(
    reactiveIsInFav,
    (state, newState: boolean) => newState
  );

  const [optimisticIsInWatchList, addOptimisticIsInWatchList] = useOptimistic(
    reactiveIsInWatchList,
    (state, newState: boolean) => newState
  );

  console.log(
    optimisticFav,
    optimisticIsInWatchList,
    'useOptimisticActionButtons'
  );

  return {
    optimisticFav,
    addOptimisticFav,
    optimisticIsInWatchList,
    addOptimisticIsInWatchList
  };
};
