'use server';

import { redirect } from 'next/navigation';
import { createServerSupabaseCli } from '.';

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
