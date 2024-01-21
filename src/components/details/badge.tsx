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
  variant?:
    | 'shadow'
    | 'dot'
    | 'solid'
    | 'bordered'
    | 'light'
    | 'flat'
    | 'faded';
};

export function GenreBadge({
  children,
  color = 'primary',
  variant = 'shadow'
}: Props) {
  return (
    <Chip
      variant={variant}
      color={color}
      size='sm'
      className='text-black text-xs h-fit py-0.5 max-md:flex-none'
      classNames={{ content: ' flex items-center w-fit' }}
    >
      {children}
    </Chip>
  );
}
