'use client';

import { useState } from 'react';
import {
  Logo,
  Navigation,
  AuthenticationButtons,
  NavigationSmallScreen,
  ProfileButton
} from './';
import { Navbar } from '@nextui-org/react';

import type { Session } from '@supabase/supabase-js';

type Props = {
  session: Session | null;
};

export function NavBarUI({ session }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <Logo isMenuOpen={isMenuOpen} />
      <Navigation />
      <NavigationSmallScreen />
      {session ? (
        <ProfileButton
          userAvatar={session.user.user_metadata.avatar_url}
          user={session.user.user_metadata.user_name}
        />
      ) : (
        <AuthenticationButtons />
      )}
    </Navbar>
  );
}
