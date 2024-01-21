export const TV_SHOWS_ENDPOINTS = {
  POPULAR: 'https://api.themoviedb.org/3/tv/popular',
  //Get a list of TV shows ordered by popularity.

  AIRING_TODAY: 'https://api.themoviedb.org/3/tv/airing_today',
  //Get a list of TV shows airing today.

  ON_THE_AIR: 'https://api.themoviedb.org/3/tv/on_the_air',
  //Get a list of TV shows that air in the next 7 days.

  TOP_RATED: 'https://api.themoviedb.org/3/tv/top_rated',
  //Get a list of TV shows ordered by rating.

  DETAILS: 'https://api.themoviedb.org/3/tv/'
  //Get Movie Details
};

export const MOVIES_ENPOINTS = {
  POPULAR: 'https://api.themoviedb.org/3/movie/popular',
  //Get a list of movies ordered by popularity.

  TRENDING: 'https://api.themoviedb.org/3/trending/movie/',
  //Get the trending movies on TMDB.

  TOP_RATED: 'https://api.themoviedb.org/3/movie/top_rated',
  //Get a list of movies ordered by rating.

  UPCOMING: 'https://api.themoviedb.org/3/movie/upcoming',
  //Get a list of movies that are being released soon.

  DETAILS: 'https://api.themoviedb.org/3/movie/'
  //Get Movie Details
};

export const COLLECTIONS_ENDPOINTS = {
  DETAILS: 'https://api.themoviedb.org/3/collection/'
};

export const MOVIE_DETAILS_SLUGS = {
  CAST: '/credits',
  IMAGES: '/images',
  SIMILAR: '/similar',
  VIDEOS: '/videos',
  PROVIDERS: '/providers'
};

export const TV_SHOWS_DETAILS_SLUGS = {
  ...MOVIE_DETAILS_SLUGS,
  SEASONS: '/seasons'
};

export const SEARCH_ENDPOINTS = {
  MOVIES: 'https://api.themoviedb.org/3/search/movie',
  COLLECTIONS: 'https://api.themoviedb.org/3/search/collection',
  TV: 'https://api.themoviedb.org/3/search/tv',
  PEOPLE: 'https://api.themoviedb.org/3/search/person'
};

const trending = 'https://api.themoviedb.org/3/trending/all/{time_window}';
const person = 'https://api.themoviedb.org/3/person/{person_id}';
const season =
  'https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}';
