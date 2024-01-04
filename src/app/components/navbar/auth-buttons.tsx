'use client';

import { NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import Link from 'next/link';

export function AuthenticationButtons() {
  return (
    <>
      <NavbarItem>
        <Link
          href='/sign-in'
          className='hover:text-secondary-400 max-md:hidden'
        >
          Login
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color='primary' href='/sign-up' variant='flat'>
          Sign Up
        </Button>
      </NavbarItem>
    </>
  );
}
