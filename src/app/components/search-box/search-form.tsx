'use client';

import { Input, Button } from '@nextui-org/react';
import { FormEvent } from 'react';

export function SearchForm() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(
      'yeah iam a bad coder, put an id in the url if you want a result thug life!'
    );
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
