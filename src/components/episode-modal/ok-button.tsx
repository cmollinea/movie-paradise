'use client';

import { Button } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

function OkButton() {
  const router = useRouter();
  console.log(document.referrer);

  const handlePressOkButton = () => {
    if (!document.referrer.includes(window.location.origin)) {
      router.back();
      return;
    }
    router.push('/');
  };

  return (
    <Button
      onClick={handlePressOkButton}
      className='bg-[#6f4ef2] shadow-lg shadow-indigo-500/20'
    >
      Ok
    </Button>
  );
}
export default OkButton;
