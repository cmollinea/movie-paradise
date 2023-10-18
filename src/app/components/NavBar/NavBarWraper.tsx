import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import NavBarUI from '../NavBar';

async function NavBarWraper() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  return <NavBarUI session={session} />;
}
export default NavBarWraper;
