'use client';

import { useState } from 'react';
import { Navbar } from '@nextui-org/react';

import Logo from './logo';
import Navigation from './navigation';
import AuthenticationButtons from './auth-buttons';
import NavigationSmallScreen from './navigation-sm';
import ProfileButton from './profile-button';
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
