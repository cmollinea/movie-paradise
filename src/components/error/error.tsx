'use client';

import { Button } from '@nextui-org/react';
import { RotateCw, UnplugIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';

export function SomethingWentWrong() {
  const router = useRouter();
  return (
    <div className='grid justify-center place-items-center gap-4'>
      <span>
        <UnplugIcon size={32} />
      </span>
      <p className='text-lg font-bold'>Something Went Wrong</p>
      <Button onClick={() => router.refresh()} color='default' variant='ghost'>
        <RotateCw size={16} /> <span>Reload Page</span>
      </Button>
    </div>
  );
}
