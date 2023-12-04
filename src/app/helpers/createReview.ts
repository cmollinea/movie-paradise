'use server';

import { MediaItem } from 'root/types';
import { redirect } from 'next/navigation';
import { supabaseUpsertToMedia } from './supabaseUpsertToMedia';
import { createServerSupabaseCli } from './create-server-supabase-cli';

type FormState = {
  message: string | null;
  type: 'error' | 'success' | null;
};

export const createReview = async (
  mediaItem: MediaItem,
  prevState: FormState,
  formdata: FormData
): Promise<FormState> => {
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

    console.log(upsertError);

    const review = {
      user_id: session?.user.id,
      media_id: mediaItem.id,
      content: formdata.get('review')
    };

    const { error: reviewError } = await supabase
      .from('reviews')
      .insert(review);

    console.log(reviewError);

    if (reviewError) {
      throw new Error('Something went wrong');
    }
    return { message: 'Comment was added', type: 'success' };
  } catch (err) {
    console.log(err);
    return { message: 'Failed to create', type: 'error' };
  }
};
