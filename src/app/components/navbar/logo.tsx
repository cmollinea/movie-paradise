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
            className=''
            alt='logo'
            src={`/brand.png`}
            width={150}
            height={150}
          />
        </NavbarBrand>
      </Link>
    </NavbarContent>
  );
}
