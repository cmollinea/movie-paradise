'use client';

import { useState } from 'react';
import {
  Logo,
  Navigation,
  AuthenticationButtons,
  NavigationSmallScreen,
  ProfileButton
} from './';
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';

import type { Session } from '@supabase/supabase-js';
import { SearchForm } from '../search-box';
import { Search, X } from 'lucide-react';

type Props = {
  session: Session | null;
};

export function NavBarUI({ session }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [openSearchBox, setOpenSearchBox] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <Logo isMenuOpen={isMenuOpen} />
      </NavbarContent>
      <NavbarContent>
        <Navigation />
      </NavbarContent>
      <NavigationSmallScreen />
      <NavbarContent as={'div'} className='w-full' justify='end'>
        {openSearchBox ? (
          <>
            <X
              className='cursor-pointer'
              onClick={() => setOpenSearchBox((prev) => !prev)}
              size={16}
            />
            <SearchForm className='max-w-fit' submitButton={false} />
          </>
        ) : (
          <Search
            className='cursor-pointer'
            onClick={() => setOpenSearchBox((prev) => !prev)}
            size={16}
          />
        )}

        {session ? (
          <ProfileButton
            userAvatar={session.user.user_metadata.avatar_url}
            user={session.user.user_metadata.user_name}
          />
        ) : (
          <AuthenticationButtons />
        )}
      </NavbarContent>
    </Navbar>
  );
}
