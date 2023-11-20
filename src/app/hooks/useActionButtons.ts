import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useInfoContext } from './useInfoContext';
import toast from 'react-hot-toast';

type Tables = 'watch_list' | 'favs';

/**
 * Custom hook for managing user action buttons.
 *
 * @param {Session | null} session - The current user session.
 * @returns {Object} - An object with a function `addMedia` for adding media to a specified table.
 *
 * @example
 * const { addMedia } = useActionButtons(session);
 * addMedia('watch_list');
 */

export function useActionButtons(session: Session | null) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const {
    info: {
      mediaItem: { id, title, overview, poster },
      mediaType
    }
  } = useInfoContext();

  // Esta funcion me crea un record del elemento en la tabla media
  const upsertToMedia = async () => {
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

  // Esta funcion me inserta un nuevo record en la tabla que reciba como argumento
  const insertToTable = async (table: Tables) => {
    try {
      const mediaItem = {
        user_id: session?.user.id,
        movie_id: id.toString()
      };

      const { error: watchListError } = await supabase
        .from(table)
        .insert(mediaItem);

      if (watchListError) {
        throw new Error('There was an error while we were working');
      }
    } catch (err: any) {
      return { error: err.message };
    }
  };

  // Esta funcion es la que cada boton usara para manejar ;adir items a las listas de usuario
  const addMedia = async (table: Tables) => {
    if (!session) {
      router.push('/sign-in');
      return;
    }
    try {
      const upsertErr = await upsertToMedia();
      if (upsertErr !== undefined) {
        throw new Error(upsertErr.error);
      }
      const insertError = await insertToTable(table);
      if (insertError !== undefined) {
        throw new Error(insertError.error);
      }
      toast.success('Item was added');
    } catch (err) {
      toast.error('There was an error while we were working');
    }
  };

  return { addMedia };
}
