'use client';

import { NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import Link from 'next/link';

function AuthenticationButtons() {
  return (
    <NavbarContent justify='end'>
      <NavbarItem className='hidden lg:flex'>
        <Link href='/sign-in' className='hover:text-secondary-400'>
          Login
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color='primary' href='/sign-up' variant='flat'>
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
}
export default AuthenticationButtons;
