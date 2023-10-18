'use client';

import { NavbarMenu, NavbarMenuItem, Link } from '@nextui-org/react';

const menuItems = [
  'Profile',
  'Dashboard',
  'Activity',
  'Analytics',
  'System',
  'Deployments',
  'My Settings',
  'Team Settings',
  'Help & Feedback',
  'Log Out'
];

function NavigationSmallScreen() {
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
            href='#'
            size='lg'
          >
            {item}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
}
export default NavigationSmallScreen;
