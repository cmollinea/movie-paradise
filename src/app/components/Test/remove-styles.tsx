'use client';

import { useParams } from 'next/navigation';

export const RemoveStyles = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const isInId = !!params.id;

  if (isInId) {
    return <>{children}</>;
  }

  return (
    <section className='w-full p-4 flex max-lg:items-center max-lg:flex-col max-lg:space-y-16 py-16 2xl:px-10 lg:space-x-10'>
      {children}
    </section>
  );
};
