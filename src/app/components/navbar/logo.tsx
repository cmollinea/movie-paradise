'use client';

import {
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand
} from '@nextui-org/react';
import Image from 'next/image';
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
          <Image
            className='hidden md:block'
            alt='logo'
            src={`/brand.png`}
            width={150}
            height={150}
          />
        </NavbarBrand>
        <NavbarBrand>
          <Image
            className='md:hidden'
            alt='logo'
            src={`/logo.png`}
            width={50}
            height={50}
          />
        </NavbarBrand>
      </Link>
    </NavbarContent>
  );
}
