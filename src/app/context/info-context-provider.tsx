'use client';
import { createContext } from 'react';
import { Info, MediaType, MediaItem } from 'root/types';

type InfoContext = {
  info: Partial<Info>;
  mediaItem: Partial<MediaItem>;
  mediaType: MediaType;
};

export const infoContext = createContext<InfoContext>({} as InfoContext);

type Props = {
  info: Partial<Info>;
  mediaType: MediaType;
  children: React.ReactNode;
};

export function InfoContextProvider({ children, info, mediaType }: Props) {
  const mediaItem: Partial<MediaItem> = {
    id: info.id,
    overview: info.overview,
    poster: info.poster,
    title: info.title
  };

  return (
    <infoContext.Provider value={{ info, mediaItem, mediaType }}>
      {children}
    </infoContext.Provider>
  );
}
