'use client';

import {
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  link
} from '@nextui-org/react';

type Props = {
  isMenuOpen: boolean;
};

function Logo({ isMenuOpen }: Props) {
  return (
    <NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className='sm:hidden'
      />
      <NavbarBrand>
        <p className='font-bold text-inherit'>CinemaPool</p>
      </NavbarBrand>
    </NavbarContent>
  );
}
export default Logo;
