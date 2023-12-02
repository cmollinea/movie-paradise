import { MediaType } from 'root/types';

export const getDetailsUrl = (id: string, type: 'tv' | 'movie') => {
  return `https://api.themoviedb.org/3/${type}/${id}?append_to_response=credits,similar,images,videos&language=en-US&include_image_language=en,null`;
};
