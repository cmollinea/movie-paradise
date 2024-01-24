'use client';
import { Button } from '@nextui-org/react';

function AuthenticationButton({ label }: { label: string }) {
  return (
    <Button variant='solid' color='primary' type='submit'>
      {label}
    </Button>
  );
}
export default AuthenticationButton;
