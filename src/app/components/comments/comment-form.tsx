'use client';
import { createReview } from '@/app/helpers/createReview';
import { MediaItem } from 'root/types';
import { SubmitButton } from './submit-fotm-button';
import { useFormState } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

type Props = {
  mediaItem: MediaItem;
};

const initialState = {
  message: null,
  type: null
};

export const CommentForm = ({ mediaItem }: Props) => {
  const hanldeCreateReview = createReview.bind(null, mediaItem);
  const [state, formAction] = useFormState(hanldeCreateReview, initialState);

  useEffect(() => {
    if (state?.type === 'success') {
      toast.success(state?.message);
    }

    if (state?.type === 'error') {
      toast.error(state?.message);
    }
  }, [state]);

  console.log('form is rendering iam going to throw a toast');

  return (
    <>
      <Toaster />
      <form
        action={formAction}
        className='w-full flex flex-col space-y-2 max-w-md'
      >
        <textarea
          name='review'
          className='rounded-md border border-transparent p-2 h-40 w-full focus:border-primary-400 focus:outline-none shadow-inner shadow-black'
        />
        <SubmitButton />
      </form>
    </>
  );
};
