export interface PersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: Date;
  deathday: null;
  gender: number;
  homepage: null | string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  combined_credits: CombinedCredits;
}

interface CombinedCredits {
  cast: Cast[];
  crew: Crew[];
}

interface Cast {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order?: number;
  media_type: MediaType;
  origin_country?: OriginCountry[];
  original_name?: string;
  first_air_date?: Date;
  name?: string;
  episode_count?: number;
}

enum MediaType {
  Movie = 'movie',
  Tv = 'tv'
}

enum OriginCountry {
  Us = 'US'
}

enum OriginalLanguage {
  En = 'en'
}

interface Crew {
  adult: boolean;
  backdrop_path: null;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  media_type: MediaType;
}
