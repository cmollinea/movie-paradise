import { createServerSupabaseCli } from '@/app/helpers/create-server-supabase-cli';
import { CommentCard } from './comment-card';
import { Title } from '../global-ui';
import { MessageSquare } from 'lucide-react';

type Props = {
  id: string;
};

export const CommentsContainer = async ({ id }: Props) => {
  const supabase = createServerSupabaseCli();
  const { data, error } = await supabase
    .from('reviews')
    .select(`id, created_at, content, users (id, user_name, avatar_url)`)
    .eq(`media_id`, parseInt(id));

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
  }
  return (
    <div className='py-10 grid gap-2'>
      <h2 className='flex items-center text-lg gap-2 text-primary-500'>
        <MessageSquare size={24} /> <span>{data?.length} comments</span>
      </h2>
      <ul className='grid gap-2'>
        {data?.map((comment) => (
          <CommentCard
            key={comment.id}
            //@ts-expect-error
            avatar_url={comment.users.avatar_url}
            //@ts-expect-error
            user_name={comment.users.user_name}
            comment={comment.content}
            created_at={comment.created_at}
          />
        ))}
      </ul>
    </div>
  );
};
