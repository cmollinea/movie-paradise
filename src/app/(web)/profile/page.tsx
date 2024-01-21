import { SomethingWentWrong } from '@/app/components/error';
import { ProfileTabsContainer } from '@/app/components/profile/tabs-container';
import { UserInfo } from '@/app/components/profile/user-info';
import { createServerSupabaseCli } from '@/app/helpers';
import { redirect } from 'next/navigation';

const Profile = async () => {
  const supabase = createServerSupabaseCli();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const [favorites, watchList] = await Promise.all([
    supabase
      .from('favs')
      .select(
        `
        id,
        created_at,
        user_id,
        media (id, title, overview, poster, media_type)
      `
      )
      .eq('user_id', session.user.id),
    supabase
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
      .eq('user_id', session.user.id)
  ]);

  console.log(watchList);

  const watchListPending = watchList.data?.filter((item) => {
    return item.complete === false;
  });

  const watchListCompleted = watchList.data?.filter((item) => {
    return item.complete === true;
  });

  console.log(session.user.user_metadata);

  return (
    <div className='grid justify-center place-items-center py-8'>
      <UserInfo user={session.user.user_metadata} />
      {favorites.data && watchListPending && watchListCompleted ? (
        <ProfileTabsContainer
          favorites={favorites.data}
          watchList={watchListPending}
          completed={watchListCompleted}
        />
      ) : (
        <SomethingWentWrong />
      )}
    </div>
  );
};
export default Profile;

// {
//   avatar_url: 'https://avatars.githubusercontent.com/u/84048220?v=4',
//   email: 'mollinea99@gmail.com',
//   email_verified: true,
//   full_name: 'Carlos Yoan Mollinea Perez',
//   iss: 'https://api.github.com',
//   name: 'Carlos Yoan Mollinea Perez',
//   phone_verified: false,
//   preferred_username: 'cmollinea',
//   provider_id: '84048220',
//   sub: '84048220',
//   user_name: 'cmollinea'
// }
