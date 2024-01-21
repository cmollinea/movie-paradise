'use client';
import { createContext, useEffect } from 'react';

type ButtonStatus = {
  isInFav: boolean;
  isInWatchList: boolean;
};

type ButtonStatusContext = {
  buttonStatus: ButtonStatus;
};

type Props = {
  children: React.ReactNode;
  isInFav: boolean;
  isInWatchList: boolean;
};

export const buttonStatusContext = createContext<ButtonStatusContext | null>(
  null
);

export const ButtonStatusProvider = ({
  children,
  isInFav,
  isInWatchList
}: Props) => {
  useEffect(() => console.log(isInFav, isInWatchList));
  return (
    <buttonStatusContext.Provider
      value={{ buttonStatus: { isInFav, isInWatchList } }}
    >
      {children}
    </buttonStatusContext.Provider>
  );
};
