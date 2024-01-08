/**
 * Generates a URL for a specific endpoint of a media bassed in mediaType argument.
 *
 * @param {string} id - The ID of the media.
 * @param {string} target- The expected type of media url
 * @param  {string} seasonNumber - The number of the season, only required if the media type is 'season'.
 * @returns {string} The endpoint for the especific mediaType.
 */

export const getTMDBEndpoint = (
  id: string,
  target: 'tv' | 'movie' | 'season' | 'collection' | 'people',
  seasonNumber?: string
) => {
  switch (target) {
    case 'season':
      return `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`;
    case 'collection':
      return `https://api.themoviedb.org/3/collection/${id}`;
    case 'people':
      return `https://api.themoviedb.org/3/person/${id}?append_to_response=combined_credits&language=en-US`;
    case 'movie' || 'tv':
      return `https://api.themoviedb.org/3/${target}/${id}?append_to_response=credits,similar,images,videos&language=en-US&include_image_language=en,null`;
    default:
      throw new Error('Target must be valid');
  }
};
