'use client';

import { Button } from '@nextui-org/react';
import { HeartIcon, PlusCircle } from 'lucide-react';
import { useActionButtons } from '@/app/hooks';

export function ActionButtons() {
  const { addMedia } = useActionButtons();

  return (
    <div className='flex space-x-2 mt-6'>
      <Button color='primary' onClick={() => addMedia('watch_list')}>
        <PlusCircle size={16} />
        Add to watch List
      </Button>
      <Button
        color='secondary'
        variant='bordered'
        onClick={() => addMedia('favs')}
      >
        <HeartIcon size={16} />
        Add to favorites
      </Button>
    </div>
  );
}
