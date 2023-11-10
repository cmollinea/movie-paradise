import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ActionButtons } from './';

export async function ServerButtonsWraper() {
  const supabase = createClientComponentClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  return <ActionButtons session={session} />;
}
