import { ButtonStatusProvider } from '@/app/context';
import { checkButtonStatus, createServerSupabaseCli } from '@/app/helpers';
import { Session } from '@supabase/supabase-js';
import { ActionButtons } from '.';

type Props = {
  session: Session | null;
  id: string;
};

export const ActionButtonServerWrapper = async ({ session, id }: Props) => {
  const supabase = createServerSupabaseCli();
  const [isInFav, isInWatchList] = await Promise.all([
    await checkButtonStatus('favs', id, session, supabase),
    await checkButtonStatus('watch_list', id, session, supabase)
  ]);

  return (
    <ButtonStatusProvider buttonStatus={{ isInFav, isInWatchList }}>
      <ActionButtons />
    </ButtonStatusProvider>
  );
};
