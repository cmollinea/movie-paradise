import { COLLECTIONS_ENDPOINTS } from '../constants/api-endpoints';

/**
 * Generates a URL for a specific endpoint of a media bassed in mediaType argument.
 *
 * @param {string} id - The ID of the media.
 * @param {string} mediaType- The expected type of media url
 * @param  {string} seasonNumber - The number of the season, only required if the media type is 'season'.
 * @returns {string} The endpoint for the especific mediaType.
 */
export const getTMDBEndpoint = (
  id: string,
  mediaType: 'tv' | 'movie' | 'season' | 'collection' | 'people',
  seasonNumber?: string
) => {
  switch (mediaType) {
    case 'season':
      return `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`;
    case 'collection':
      return `${COLLECTIONS_ENDPOINTS.DETAILS + id}`;
    case 'people':
      return `https://api.themoviedb.org/3/person/${id}?append_to_response=combined_credits&language=en-US`;
    default:
      return `https://api.themoviedb.org/3/${mediaType}/${id}?append_to_response=credits,similar,images,videos&language=en-US&include_image_language=en,null`;
  }
};
