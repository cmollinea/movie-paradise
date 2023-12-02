export interface MovieFullDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: Credits;
  similar: Similar;
  images: Images;
  videos: Videos;
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Credits {
  cast: Cast[];
  crew: Cast[];
}

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: string;
}

type Department =
  | 'Acting'
  | 'Crew'
  | 'Camera'
  | 'Directing'
  | 'Production'
  | 'Sound'
  | 'Writing'
  | 'Editing'
  | 'Art'
  | 'Costume & Make-Up'
  | 'Visual Effects';

interface Genre {
  id: number;
  name: string;
}

export interface Images {
  backdrops: Backdrop[];
  logos: Backdrop[];
  posters: Backdrop[];
}

interface Backdrop {
  aspect_ratio: number;
  height: number;
  iso_639_1: OriginalLanguage | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

type OriginalLanguage = string;

interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface MovieSimilar {
  page: number;
  results: SimilarResult[];
  total_pages: number;
  total_results: number;
}

interface SimilarResult {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Videos {
  results: VideosResult[];
}

interface VideosResult {
  iso_639_1: OriginalLanguage;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}
