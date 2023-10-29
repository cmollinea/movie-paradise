'use client';
import { CircularProgress } from '@nextui-org/react';

type Props = {
  value: number;
};

function Progress({ value }: Props) {
  return (
    <CircularProgress
      size='lg'
      value={value * 10}
      valueLabel={value.toFixed(1)}
      color='primary'
      showValueLabel={true}
      className='mt-2'
      classNames={{
        value: 'font-bold text-md'
      }}
    />
  );
}

export default Progress;
