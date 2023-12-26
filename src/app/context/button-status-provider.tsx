'use client';
import { createContext } from 'react';

type ButtonStatus = {
  isInFav: boolean;
  isInWatchList: boolean;
};

type ButtonStatusContext = {
  buttonStatus: ButtonStatus;
};

type Props = {
  children: React.ReactNode;
  buttonStatus: ButtonStatus;
};

export const buttonStatusContext = createContext<ButtonStatusContext | null>(
  null
);

export const ButtonStatusProvider = ({ children, buttonStatus }: Props) => {
  return (
    <buttonStatusContext.Provider value={{ buttonStatus }}>
      {children}
    </buttonStatusContext.Provider>
  );
};
