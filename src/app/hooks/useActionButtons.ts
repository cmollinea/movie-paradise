import { useInfoContext } from './useInfoContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createClienSupabaseCli } from '../helpers/create-client-supabase-cli';
import { useState } from 'react';
import { useOptimisticActionButtons } from './useOptimisticActionButtons';

export type Tables = 'watch_list' | 'favs';
export type ActionState = 'loading' | 'idle';

/**
 * Custom hook to manage user actions on media items.
 * Provides functionality to add media items to user's watch list or favorites.
 *
 * @returns {Object} - An object containing the addMedia function.
 */

export function useActionButtons() {
  const supabase = createClienSupabaseCli();
  const [actionState, setActionState] = useState<ActionState>('idle');
  //This was my first optimisitic implementation it need fixes
  const {
    addOptimisticFav,
    addOptimisticIsInWatchList,
    optimisticFav,
    optimisticIsInWatchList
  } = useOptimisticActionButtons();
  const router = useRouter();
  const {
    info: {
      mediaItem: { id, title, overview, poster },
      mediaType,
      session
    }
  } = useInfoContext();

  /**
   * Function to create a record of the element in the media table.
   *
   * @throws Will throw an error if the user is not authenticated or if there's an error in the upsert operation.
   */

  const upsertToMedia = async () => {
    try {
      if (!session) {
        router.push('/sign-in');
        return;
      }
      const { error: mediaError } = await supabase
        .from('media')
        .upsert(
          { id, title, overview, poster, media_type: mediaType },
          { onConflict: 'id', ignoreDuplicates: true }
        );

      if (mediaError) {
        throw new Error(mediaError.details);
      }
    } catch (err: any) {
      return { error: err.message };
    }
  };

  /**
   * Function to insert a new record in the table that it receives as an argument.
   *
   * @param {Tables} table - The user table to add the media item to. Can be 'watch_list' or 'favs'.
   * @param {string} user_id - The ID of the user.
   * @throws Will throw an error if there's an error in the insert operation.
   */

  const insertToTable = async (table: Tables, user_id: string) => {
    try {
      const mediaItem = {
        user_id: user_id,
        movie_id: (id as string).toString()
      };

      const { error: watchListError } = await supabase
        .from(table)
        .insert(mediaItem);

      if (watchListError) {
        throw new Error(watchListError.details);
      }
    } catch (err: any) {
      return { error: err.message };
    }
  };

  /**
   * Function to add a media item to a specified user table (watch list or favorites).
   * It first checks if the user is authenticated, then upserts the media item to the media table,
   * and finally inserts the media item to the specified user table.
   *
   * @param {Tables} table - The user table to add the media item to. Can be 'watch_list' or 'favs'.
   * @throws Will throw an error if the user is not authenticated or if there's an error in the upsert/insert operations.
   */

  const addMedia = async (table: Tables) => {
    console.log(optimisticFav);

    try {
      setActionState('loading');
      if (!session) {
        router.push('/sign-in');
        return;
      }

      const upsertErr = await upsertToMedia();
      if (upsertErr !== undefined) {
        throw new Error(upsertErr.error);
      }
      const insertError = await insertToTable(table, session.user.id);
      if (insertError !== undefined) {
        throw new Error(insertError.error);
      }
      toast.success('Item was added');
      if (table === 'favs') {
        addOptimisticFav(true);
      } else {
        addOptimisticIsInWatchList(true);
      }
    } catch (err) {
      toast.error('There was an error while we were working');
    } finally {
      setActionState('idle');
    }
  };

  const deleteFromTable = async (table: Tables) => {
    try {
      setActionState('loading');
      const { error: deleteFromListError } = await supabase
        .from(table)
        .delete()
        .eq('user_id', session?.user.id)
        .eq('movie_id', id);

      if (deleteFromListError) {
        throw new Error(deleteFromListError.details);
      }
      toast.success('Item was removed');
      if (table === 'favs') {
        addOptimisticFav(false);
      } else {
        addOptimisticIsInWatchList(false);
      }
    } catch (err: any) {
      toast.error('There was an error while we were working');
    } finally {
      setActionState('idle');
    }
  };

  return {
    addMedia,
    deleteFromTable,
    actionState,
    optimisticFav,
    optimisticIsInWatchList
  };
}
