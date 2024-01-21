'use client';

import { useFloatingButton } from '@/app/hooks/useFloatingButton';
import { Button } from '@nextui-org/react';
import { Check, Circle } from 'lucide-react';

type Props = {
  complete: boolean;
  id: number;
};
export const FloatingButton = ({ complete, id }: Props) => {
  const { handleButtonClick, renderAsCompleted } = useFloatingButton(
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
      {renderAsCompleted ? (
        <Check size={10} />
      ) : (
        <Circle strokeWidth={2} size={10} />
      )}
      <span>{renderAsCompleted ? 'Completed' : 'Mark as complete'}</span>
    </Button>
  );
};
