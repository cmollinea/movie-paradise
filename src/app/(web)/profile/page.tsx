import { createServerSupabaseCli } from '@/app/helpers';
import { redirect } from 'next/navigation';

const Profile = async () => {
  const supabase = createServerSupabaseCli();
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    redirect('/');
  }

  const favorites = await supabase
    .from('favs')
    .select(
      `
  id,
  created_at,
  user_id,
  media (id, title, overview, poster, media_type)
  `
    )
    .eq('user_id', session.session.user.id);

  const watchList = await supabase
    .from('watch_list')
    .select(
      `
  id,
  created_at,
  user_id,
  complete,
  media (id, title, overview, poster, media_type)
  `
    )
    .eq('user_id', session.session.user.id);

  return (
    <div className='grid grid-cols-2'>
      <div>
        <h1>Favorites</h1>
        <ul>
          {favorites.data?.map((fav) => (
            //@ts-expect-error
            <li key={fav.id}>{fav.media.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Watch List</h1>
        <ul>
          {watchList.data?.map((item) => (
            //@ts-expect-error
            <li key={item.id}>{item.media.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Profile;
