import { MediaItem } from 'root/types';
import { CommentForm } from './comment-form';
import { CommentsContainer } from './comments-container';

type Props = {
  mediaItem: MediaItem;
};

export const CommentSection = ({ mediaItem }: Props) => {
  return (
    <div>
      <CommentForm mediaItem={mediaItem} />
      <CommentsContainer />
    </div>
  );
};
