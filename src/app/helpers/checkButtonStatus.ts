import { Session, SupabaseClient } from '@supabase/supabase-js';
import { Tables } from '../hooks';

/**
 * Function to check if a media is already in table
 *
 * @param table The table that you want to check
 * @param id The media id
 * @param session The user session
 * @param supabase Supabase server client
 * @returns
 */

export const checkButtonStatus = async (
  table: Tables,
  id: string,
  session: Session | null,
  supabase: SupabaseClient
) => {
  if (!session) {
    return false;
  }
  const data = await supabase
    .from(table)
    .select()
    .eq('user_id', session.user.id)
    .eq('movie_id', id);

  console.log(data.data);

  return Boolean(data.data?.length);
};
