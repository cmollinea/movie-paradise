'use client';
import { Chip } from '@nextui-org/react';

type Props = {
  children: React.ReactNode;
};

function GenreBadge({ children }: Props) {
  return (
    <Chip
      variant='shadow'
      color='primary'
      size='sm'
      className='mt-4 text-black text-xs h-fit py-0.5'
    >
      {children}
    </Chip>
  );
}
export default GenreBadge;
