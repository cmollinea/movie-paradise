'use client';
import { createReview } from '@/app/helpers/createReview';
import { MediaItem } from 'root/types';
import { SubmitButton } from './submit-fotm-button';
import { Title } from '../global-ui';
import { useCallback, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  mediaItem: MediaItem;
};

const initialState = {
  message: null,
  type: null
};

export const CommentForm = ({ mediaItem }: Props) => {
  const hanldeCreateReview = createReview.bind(null, mediaItem);
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);
  const [state, formAction] = useFormState(hanldeCreateReview, initialState);
  const router = useRouter();
  console.log('form is rendering iam going to throw a toast');

  useEffect(() => {
    if (state?.type === 'success') {
      toast.success(state?.message);
      textAreaRef.current && (textAreaRef.current.value = ' ');
      router.refresh();
    }

    if (state?.type === 'error') {
      toast.error(state?.message);
    }
  }, [state, router]);
  return (
    <div>
      <Toaster />
      <Title>Leave your review</Title>
      <form action={formAction} className='w-full flex flex-col space-y-2 mt-4'>
        <textarea
          ref={textAreaRef}
          name='review'
          className='rounded-md bg-gray-100/5 border border-transparent p-2 h-40 w-full focus:border-primary-400 focus:outline-none shadow-inner shadow-black'
        />
        <SubmitButton />
      </form>
    </div>
  );
};
