'use client';
import { SyntheticEvent, useState } from 'react';
import { markAsComplete } from '../helpers/createReview';
import toast from 'react-hot-toast';

export const useFloatingButton = (initialState: boolean, id: number) => {
  const [renderAsCompleted, setRenderAsCompleted] = useState(initialState);

  const handleButtonClick = async (e: SyntheticEvent) => {
    e.stopPropagation();
    if (initialState === true) {
      return;
    }

    const res = await markAsComplete(id);

    if (res.status === 'error') {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    setRenderAsCompleted(true);
  };

  return { renderAsCompleted, handleButtonClick };
};
