'use client';

import {
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand
} from '@nextui-org/react';
import Link from 'next/link';

type Props = {
  isMenuOpen: boolean;
};

export function Logo({ isMenuOpen }: Props) {
  return (
    <NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className='sm:hidden'
      />
      <Link href={'/'}>
        <NavbarBrand>
          <p className='font-bold text-inherit'>CinemaPool</p>
        </NavbarBrand>
      </Link>
    </NavbarContent>
  );
}
