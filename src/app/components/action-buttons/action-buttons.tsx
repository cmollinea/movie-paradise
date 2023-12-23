'use client';

import { Button } from '@nextui-org/react';
import { HeartIcon, HeartOff, MinusCircle, PlusCircle } from 'lucide-react';
import { useActionButtons } from '@/app/hooks';
import { useButtonStatusContext } from '@/app/hooks';

export function ActionButtons() {
  const { addMedia, deleteFromTable } = useActionButtons();
  const { isInFav, isInWatchList } = useButtonStatusContext();
  console.log(isInFav, isInWatchList);

  //todo Make 2 more buttons (destructive ones) and if is in database make them to remove from it

  return (
    <div className='flex space-x-2 mt-6'>
      {isInWatchList ? (
        <Button
          color='warning'
          variant='flat'
          onClick={() => deleteFromTable('watch_list')}
        >
          <MinusCircle size={16} />
          Remove from watch list
        </Button>
      ) : (
        <Button
          disabled={isInWatchList}
          color='primary'
          onClick={() => addMedia('watch_list')}
        >
          <PlusCircle size={16} />
          Add to watch List
        </Button>
      )}
      {isInFav ? (
        <Button
          color='warning'
          variant='flat'
          onClick={() => deleteFromTable('favs')}
        >
          <HeartOff size={16} />
          Remove from favorites
        </Button>
      ) : (
        <Button
          disabled={isInFav}
          color='secondary'
          onClick={() => addMedia('favs')}
        >
          <HeartIcon size={16} /> Add to Favorites
        </Button>
      )}
    </div>
  );
}
