'use client';
import { Chip } from '@nextui-org/react';

type Props = {
  children: React.ReactNode;
  color?:
    | 'primary'
    | 'default'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
};

export function GenreBadge({ children, color = 'primary' }: Props) {
  return (
    <Chip
      variant='shadow'
      color={color}
      size='sm'
      className='text-black text-xs h-fit py-0.5 max-md:flex-none'
      classNames={{ content: ' flex items-center w-fit' }}
    >
      {children}
    </Chip>
  );
}
