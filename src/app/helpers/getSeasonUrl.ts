/**
 * Generates a URL for a specific season of a TV series.
 *
 * @param {string} seriesId - The ID of the TV series.
 * @param {string} seasonNumber - The number of the season.
 * @returns {string} The URL for the specified season of the TV series.
 */
export const getSeasonUrl = (seriesId: string, seasonNumber: string) => {
  return `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}`;
};
