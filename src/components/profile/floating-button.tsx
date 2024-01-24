'use client';

import { useFloatingButton } from '@/hooks/useFloatingButton';
import { Button, Spinner } from '@nextui-org/react';
import { Check, Circle } from 'lucide-react';

type Props = {
  complete: boolean;
  id: number;
};
export const FloatingButton = ({ complete, id }: Props) => {
  const { handleButtonClick, renderAsCompleted, isWorking } = useFloatingButton(
    complete,
    id
  );

  return (
    <Button
      onClick={(e) => handleButtonClick(e)}
      size='sm'
      variant='shadow'
      color='primary'
      radius='full'
      className='absolute md:opacity-0 md:group-hover:opacity-100 bottom-2 left-1 transition-opacity ease-in-out z-40 text-black w-fit text-[10px] h-fit p-1'
    >
      {isWorking ? (
        <Spinner
          color='current'
          classNames={{
            base: 'w-4 h-4',
            wrapper: 'w-4 h-4',
            circle1: 'w-4 h-4',
            circle2: 'w-4 h-4'
          }}
        />
      ) : renderAsCompleted ? (
        <Check size={10} />
      ) : (
        <Circle strokeWidth={2} size={10} />
      )}
      <span>
        {isWorking
          ? 'Adding...'
          : renderAsCompleted
          ? 'Completed'
          : 'Mark as complete'}
      </span>
    </Button>
  );
};
