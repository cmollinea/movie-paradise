'use client';

import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export const RemoveAside = ({ children }: Props) => {
  const pathname = usePathname();
  if (pathname === '/movies' || pathname === '/tv') {
    return <>{children}</>;
  }
  return <></>;
};
