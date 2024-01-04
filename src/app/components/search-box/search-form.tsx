'use client';

import { Input, Button } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';

type Props = {
  className: string;
  submitButton?: boolean;
};

export function SearchForm({ className, submitButton = true }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const query = data.get('query')?.toString();
    if (query) {
      const newUrlSearchParams = new URLSearchParams(searchParams);
      newUrlSearchParams.set('query', query);
      router.push('/search' + '?' + newUrlSearchParams.toString());
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={`flex z-10 ${className} w-full space-x-4`}
    >
      <Input
        type='text'
        autoComplete='off'
        name='query'
        labelPlacement='outside'
        placeholder='Search movies, tv-shows, and people'
        className='text-background'
      />
      {submitButton && (
        <Button type='submit' variant='bordered' color='primary'>
          Search
        </Button>
      )}
    </form>
  );
}

//TODO Crear el form, al hacer submit navegar a search con ?query={query}
