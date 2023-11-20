'use client';

import { useActionButtons } from '@/app/hooks';
import { Button } from '@nextui-org/react';
import { Session } from '@supabase/auth-helpers-nextjs';
import { HeartIcon, PlusCircle } from 'lucide-react';

type Props = {
  session: Session | null;
};

export function ActionButtons({ session }: Props) {
  const { addMedia } = useActionButtons(session);

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
