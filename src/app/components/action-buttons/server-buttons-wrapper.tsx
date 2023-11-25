import { createClienSupabaseCli } from '@/app/helpers/create-client-supabase-cli';
import { ActionButtons } from './';

export async function ServerButtonsWraper() {
  const supabase = createClienSupabaseCli();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  return <ActionButtons session={session} />;
}
