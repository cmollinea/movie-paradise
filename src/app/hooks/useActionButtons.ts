import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useInfoContext } from './useInfoContext';

type Tables = 'watch_list' | 'favs';

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
    const { error: mediaError } = await supabase
      .from('media')
      .upsert(
        { id, title, overview, poster, media_type: mediaType },
        { onConflict: 'id', ignoreDuplicates: true }
      );

    if (mediaError) {
      console.error(mediaError);
      //TODO  Make a error toast
    }

    //TODO  Make a success toast
  };

  // Esta funcion me inserta un nuevo record en la tabla que reciba como argumento
  const insertToTable = async (table: Tables) => {
    const mediaItem = {
      user_id: session?.user.id,
      movie_id: id.toString()
    };

    const { error: watchListError } = await supabase
      .from(table)
      .insert(mediaItem);

    if (watchListError) {
      console.error(watchListError);
      //TODO  Make a error toast
    }

    //TODO  Make a success toast
  };

  const addToWatchList = () => {
    if (!session) {
      router.push('/sign-in');
      return;
    }

    upsertToMedia();
    insertToTable('watch_list');
  };

  const addToFavorites = () => {
    if (!session) {
      router.push('/sign-in');
    }

    upsertToMedia();
    insertToTable('favs');
  };

  return { addToWatchList, addToFavorites };
}
