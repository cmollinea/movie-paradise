'use client';

import { Input, Button } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const query = data.get('query')?.toString();
    if (query) {
      const newUrlSearchParams = new URLSearchParams(searchParams);
      newUrlSearchParams.set('q', query);
      router.push('/search' + '?' + newUrlSearchParams.toString());
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='flex max-w-md w-full space-x-4'
    >
      <Input
        type='text'
        autoComplete='off'
        name='query'
        labelPlacement='outside'
        placeholder='Search movies, tv-shows, and people'
        className='text-background'
      />
      <Button type='submit' variant='bordered' color='primary'>
        Search
      </Button>
    </form>
  );
}

//TODO Crear el form, al hacer submit navegar a search con ?query={query}
