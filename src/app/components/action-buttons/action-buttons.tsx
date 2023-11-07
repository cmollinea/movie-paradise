'use client';

import { useActionButtons } from '@/app/hooks';
import { Button } from '@nextui-org/react';
import { Session } from '@supabase/auth-helpers-nextjs';
import { HeartIcon, PlusCircle } from 'lucide-react';

type Props = {
  session: Session | null;
};

function ActionButtons({ session }: Props) {
  const { addToWatchList, addToFavorites } = useActionButtons(session);

  return (
    <div className='flex space-x-2'>
      <Button color='primary' onClick={addToWatchList}>
        <PlusCircle size={16} />
        Add to watch List
      </Button>
      <Button color='secondary' variant='bordered' onClick={addToFavorites}>
        <HeartIcon size={16} />
        Add to favorites
      </Button>
    </div>
  );
}
export default ActionButtons;
