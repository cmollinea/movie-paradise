'use client';
import { SyntheticEvent, useState } from 'react';
import { markAsComplete } from '@/actions';
import toast from 'react-hot-toast';

export const useFloatingButton = (initialState: boolean, id: number) => {
  const [renderAsCompleted, setRenderAsCompleted] = useState(initialState);
  const [isWorking, setIsWorking] = useState(false);

  const handleButtonClick = async (e: SyntheticEvent) => {
    e.stopPropagation();
    if (initialState === true) {
      return;
    }
    setIsWorking(true);
    const res = await markAsComplete(id);

    if (res.status === 'error') {
      toast.error(res.message);
      setIsWorking(false);
      return;
    }

    toast.success(res.message);
    setRenderAsCompleted(true);
    setIsWorking(false);
  };

  return { renderAsCompleted, handleButtonClick, isWorking };
};
