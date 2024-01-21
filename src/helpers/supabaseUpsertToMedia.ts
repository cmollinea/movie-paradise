import { MediaItem } from 'root/types';
import { createServerSupabaseCli } from './create-server-supabase-cli';

export const supabaseUpsertToMedia = async (
  media: MediaItem,
  mediaType: 'tv' | 'movies'
) => {
  const { id, title, overview, poster } = media;
  const supabase = createServerSupabaseCli();

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
