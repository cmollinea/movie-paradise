'use client';

import { useState } from 'react';
import { Navbar } from '@nextui-org/react';

import Logo from './NavBar/Logo';
import Navigation from './NavBar/Navigation';
import AuthenticationButtons from './NavBar/auth-buttons';
import NavigationSmallScreen from './NavBar/navigation-sm';
import ProfileButton from './NavBar/profile-button';
import type { Session } from '@supabase/supabase-js';

type Props = {
  session: Session | null;
};

export default function NavBarUI({ session }: Props) {
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