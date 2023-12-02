import { MediaItem } from 'root/types';
import { CommentForm } from './comment-form';
import { CommentsContainer } from './comments-container';
import { Suspense } from 'react';

type Props = {
  mediaItem: MediaItem;
  children: React.ReactNode;
};

export const CommentSection = ({ mediaItem, children }: Props) => {
  return (
    <>
      {children}
      <CommentForm mediaItem={mediaItem} />
    </>
  );
};
