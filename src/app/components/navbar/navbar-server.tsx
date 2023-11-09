import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import NavBarUI from './navbar-ui';

async function NavBarServer() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  console.log(error);

  return <NavBarUI session={session} />;
}
export default NavBarServer;
