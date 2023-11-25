'use client';

import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      aria-disabled={pending}
      variant='flat'
      color='primary'
    >
      Post Review
    </Button>
  );
}
