import { supabaseUpsertToMedia } from '@/app/helpers/supabaseUpsertToMedia';
import {
  createServerActionClient,
  createServerComponentClient
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { MediaItem } from 'root/types';

type Props = {
  mediaItem: MediaItem;
};

export const CommentForm = async ({ mediaItem }: Props) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const createReview = async (formdata: FormData) => {
    'use server';
    const cookieStore2 = cookies();
    const supabase2 = createServerActionClient({ cookies: () => cookieStore2 });

    try {
      const upsertError = await supabaseUpsertToMedia(
        supabase2,
        mediaItem,
        'movies'
      );

      const review = {
        user_id: session?.user.id,
        media_id: mediaItem.id,
        content: formdata.get('review')
      };

      const { error: reviewError } = await supabase2
        .from('reviews')
        .insert(review);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action={createReview}>
      <textarea name='review' />
      <button>Submit</button>
    </form>
  );
};
