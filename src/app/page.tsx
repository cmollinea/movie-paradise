import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const userInfo = session?.user;

  return (
    <main className=' text-foreground'>
      <pre className=''>{JSON.stringify(userInfo, null, 2)}</pre>
    </main>
  );
}
