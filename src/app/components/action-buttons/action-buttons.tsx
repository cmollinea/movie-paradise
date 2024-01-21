'use client';

import { HeartIcon, HeartOff, MinusCircle, PlusCircle } from 'lucide-react';
import { useActionButtons } from '@/app/hooks';
import { ActionButton } from './action-button';

export function ActionButtons() {
  const { addMedia, deleteFromTable, optimisticFav, optimisticIsInWatchList } =
    useActionButtons();
  // const { isInFav, isInWatchList } = useButtonStatusContext();

  return (
    <div className='flex space-x-2 mt-6'>
      {optimisticIsInWatchList ? (
        <ActionButton
          color='warning'
          variant='flat'
          table='watch_list'
          action={deleteFromTable}
          icon={<MinusCircle size={16} />}
          label='Remove from watch list'
        />
      ) : (
        <ActionButton
          color='primary'
          variant='solid'
          table='watch_list'
          action={addMedia}
          icon={<PlusCircle size={16} />}
          label='Add to watch List'
        />
      )}
      {optimisticFav ? (
        <ActionButton
          color='warning'
          variant='flat'
          table='favs'
          action={deleteFromTable}
          icon={<HeartOff size={16} />}
          label='Remove from favorites'
        />
      ) : (
        <ActionButton
          color='secondary'
          variant='solid'
          table='favs'
          action={addMedia}
          icon={<HeartIcon size={16} />}
          label='Add to Favorites'
        />
      )}
    </div>
  );
}
