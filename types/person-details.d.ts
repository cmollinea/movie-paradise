export interface PersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: null;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  images: Images;
  movie_credits: MovieCredits;
  tv_credits: TvCredits;
}

interface Images {
  profiles: Profile[];
}

interface Profile {
  aspect_ratio: number;
  height: number;
  iso_639_1: null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface MovieCredits {
  cast: MovieCreditsCast[];
  crew: MovieCreditsCast[];
}

interface MovieCreditsCast {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: PurpleOriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: PurpleDepartment;
  job?: PurpleJob;
}

enum PurpleDepartment {
  Production = 'Production',
  Writing = 'Writing'
}

enum PurpleJob {
  ExecutiveProducer = 'Executive Producer',
  Producer = 'Producer',
  Screenplay = 'Screenplay',
  Writer = 'Writer'
}

enum PurpleOriginalLanguage {
  En = 'en',
  Es = 'es',
  Fr = 'fr',
  Hu = 'hu',
  It = 'it',
  Ja = 'ja',
  Pt = 'pt'
}

interface TvCredits {
  cast: TvCreditsCast[];
  crew: TvCreditsCast[];
}

interface TvCreditsCast {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  origin_country: OriginCountry[];
  original_language: FluffyOriginalLanguage;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  character?: string;
  credit_id: string;
  episode_count?: number;
  department?: FluffyDepartment;
  job?: FluffyJob;
}

enum FluffyDepartment {
  Creator = 'Creator',
  Production = 'Production'
}

enum FluffyJob {
  Creator = 'Creator',
  ExecutiveProducer = 'Executive Producer',
  Producer = 'Producer'
}

enum OriginCountry {
  Au = 'AU',
  CA = 'CA',
  De = 'DE',
  GB = 'GB',
  Us = 'US'
}

enum FluffyOriginalLanguage {
  De = 'de',
  En = 'en'
}
