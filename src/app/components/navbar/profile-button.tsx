'use client';

import { createClienSupabaseCli } from '@/app/helpers/create-client-supabase-cli';
import {
  NavbarContent,
  Dropdown,
  DropdownItem,
  Avatar,
  DropdownTrigger,
  DropdownMenu
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

type Props = {
  user: string;
  userAvatar: string;
};

export function ProfileButton({ user, userAvatar }: Props) {
  const router = useRouter();
  const supabase = createClienSupabaseCli();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <NavbarContent as='div' justify='end'>
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avatar
            isBordered
            as='button'
            className='transition-transform'
            color='secondary'
            name='Jason Hughes'
            size='sm'
            src={userAvatar}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className='h-14 gap-2'>
            <p className='font-semibold'>Signed in as</p>
            <p className='font-semibold'>{user}</p>
          </DropdownItem>
          <DropdownItem key='settings'>Favourites</DropdownItem>
          <DropdownItem key='team_settings'>Watch List</DropdownItem>
          <DropdownItem key='logout' color='danger' onClick={handleSignOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
}
