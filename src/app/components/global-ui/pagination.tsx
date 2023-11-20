'use client';

import { Pagination as NextPagination } from '@nextui-org/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

type Props = { total: number; currentPage: string };

export function Pagination({ total, currentPage }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const handlePagination = (page: number) => {
    const _searchParams = new URLSearchParams(searchParams);
    _searchParams.set('page', page.toString());
    router.push(path + '?' + _searchParams.toString());
  };

  return (
    <NextPagination
      page={parseInt(currentPage)}
      variant='bordered'
      total={total}
      initialPage={1}
      onChange={(page) => handlePagination(page)}
    />
  );
}
