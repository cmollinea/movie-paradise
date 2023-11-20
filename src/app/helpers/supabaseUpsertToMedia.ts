import { SupabaseClient } from '@supabase/supabase-js';
import { MediaItem } from 'root/types';
import { Target } from '../components/search-sidebar';

type Supabase = SupabaseClient<any, 'public', any>;

export const supabaseUpsertToMedia = async (
  supabase: Supabase,
  media: MediaItem,
  mediaType: 'tv' | 'movies'
) => {
  const { id, title, overview, poster } = media;
  try {
    const { error: mediaError } = await supabase
      .from('media')
      .upsert(
        { id, title, overview, poster, media_type: mediaType },
        { onConflict: 'id', ignoreDuplicates: true }
      );

    if (mediaError) {
      throw new Error('There was an error while we were working');
    }
  } catch (err: any) {
    return { error: err.message };
  }
};
