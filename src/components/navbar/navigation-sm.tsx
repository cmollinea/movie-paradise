'use client';

import { NavbarMenu, NavbarMenuItem, Link } from '@nextui-org/react';

const menuItems = [
  { label: 'Movies', href: '/movies' },
  { label: 'Tv', href: '/tv' },
  { label: 'People', href: '/people' },
  { label: 'Profile', href: '/profile' },
  { label: 'LogOut', href: '/logout' }
];

export function NavigationSmallScreen() {
  return (
    <NavbarMenu>
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            color={
              index === 2
                ? 'primary'
                : index === menuItems.length - 1
                ? 'danger'
                : 'foreground'
            }
            className='w-full'
            href={item.href}
            size='lg'
          >
            {item.label}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
}
