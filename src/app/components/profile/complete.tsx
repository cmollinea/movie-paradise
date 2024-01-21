import { createServerSupabaseCli } from '@/app/helpers';
import { Session } from '@supabase/supabase-js';
import { TabInfo } from './tab-info';

type Props = {
  session: Session;
};

export const Complete = async ({ session }: Props) => {
  const supabase = createServerSupabaseCli();

  const complete = await supabase
    .from('watch_list')
    .select(
      `
        id,
        created_at,
        user_id,
        complete,
        media (id, title, overview, poster, media_type)
  `
    )
    .eq('user_id', session.user.id)
    .eq('complete', false);

  return (
    <div>
      <p>Complete</p>
      {complete.data?.map((item) => (
        <p key={item.media[0].id}>{item.media[0]?.title}</p>
      ))}

      <TabInfo totalItems={complete.data?.length ?? 0} />
    </div>
  );
};
