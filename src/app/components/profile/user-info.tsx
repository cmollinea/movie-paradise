import { Image, user } from '@nextui-org/react';

export const UserInfo = ({ user }: { user: any }) => {
  return (
    <div className='w-fit text-center flex flex-col items-center place-content-center gap-1 mb-6'>
      <Image
        alt='avatar'
        src={user.avatar_url}
        height={200}
        width={200}
        className='rounded-full border-4 border-primary-400'
      />
      <p className=' text-sm antialiased text-foreground-400'>
        {user.user_name}
      </p>
      <p className='text-lg font-bold'>{user.full_name}</p>
    </div>
  );
};
