'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [finish, setFinish] = useState(false);

  const handleFinish = useCallback(() => {
    setFinish(true);
  }, []);

  useEffect(() => {
    console.log('aaaaaaa');

    setFinish(false);
    return setFinish(true);
  }, [pathname, searchParams, handleFinish]);

  return (
    <div
      className={`fixed inset-0 z-[80] bg-gradient-to-b from-primary-500/50 to-secondary-500/50 ${
        finish ? 'hidden' : ''
      }`}
    ></div>
  );
}
