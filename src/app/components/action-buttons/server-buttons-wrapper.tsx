import { ActionButtons } from './';
import { createClienSupabaseCli } from '@/app/helpers/create-client-supabase-cli';

export async function ServerButtonsWraper() {
  const supabase = createClienSupabaseCli();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  return <ActionButtons session={session} />;
}
