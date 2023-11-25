'use client';
import { createReview } from '@/app/helpers/createReview';
import { MediaItem } from 'root/types';
import { SubmitButton } from './submit-fotm-button';
import { useFormState } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  mediaItem: MediaItem;
};

const initialState = {
  message: null
};

export const CommentForm = ({ mediaItem }: Props) => {
  const hanldeCreateReview = createReview.bind(null, mediaItem);
  const [state, formAction] = useFormState(hanldeCreateReview, initialState);

  if (state?.message) {
    toast.error(state?.message);
  }

  return (
    <>
      <Toaster />
      <form action={formAction}>
        <textarea name='review' />
        <SubmitButton />
      </form>
    </>
  );
};
