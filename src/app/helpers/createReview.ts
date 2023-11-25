'use server';

import { MediaItem } from 'root/types';
import { redirect } from 'next/navigation';
import { supabaseUpsertToMedia } from './supabaseUpsertToMedia';
import { createServerSupabaseCli } from './create-server-supabase-cli';

export const createReview = async (
  mediaItem: MediaItem,
  prevState: any,
  formdata: FormData
) => {
  'use server';
  const supabase = createServerSupabaseCli();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect('/sign-in');
  }

  try {
    const upsertError = await supabaseUpsertToMedia(mediaItem, 'movies');

    if (upsertError) {
      throw new Error('Something went wrong');
    }

    const review = {
      user_id: session?.user.id,
      media_id: mediaItem.id,
      content: formdata.get('review')
    };

    const { error: reviewError } = await supabase
      .from('reviews')
      .insert(review);

    if (reviewError) {
      throw new Error('Something went wrong');
    }
  } catch (err) {
    console.log(err);
    return { message: 'Failed to create' };
  }
};
