export const DISCOVER_MOVIE_ENDPOINT =
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1';

export const DISCOVER_TV_ENDPOINT =
  ' https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1';

export const filters = {
  vote_average_lte: 'vote_average.lte',
  vote_average_gte: 'vote_average.gte',
  vote_count_gte: 'vote_count.gte',
  vote_count_lte: 'vote_count.lte',
  with_genres: 'with_genres',
  sort_by: 'sort_by',
  year: 'year',
  page: 'page',
  genre: 'genre'
};
