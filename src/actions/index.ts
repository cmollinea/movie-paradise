'use server';

import { MediaItem } from 'root/types';
import { redirect } from 'next/navigation';
import { supabaseUpsertToMedia, createServerSupabaseCli } from '@/app/helpers';

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
    return { message: 'Comment was added', type: 'success' };
  } catch (err) {
    return { message: 'Failed to create', type: 'error' };
  }
};

export const markAsComplete = async (id: number) => {
  const supabase = createServerSupabaseCli();

  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
      redirect('/sign-in');
    }

    const { error } = await supabase
      .from('watch_list')
      .update({ complete: true })
      .eq('user_id', session.user.id)
      .eq('id', id);

    if (error) {
      return { status: 'error', message: error.message } as const;
    }

    return { status: 'ok', message: 'Media marked as completed' } as const;
  } catch (error) {
    return { status: 'error', message: 'Something went wrong' } as const;
  }
};
