import { useOptimistic, useState } from 'react';
import { useButtonStatusContext } from '.';

export const useOptimisticActionButtons = () => {
  const { isInFav, isInWatchList } = useButtonStatusContext();
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

  return {
    optimisticFav,
    addOptimisticFav,
    optimisticIsInWatchList,
    addOptimisticIsInWatchList
  };
};
