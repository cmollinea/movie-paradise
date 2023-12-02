import type { MediaType } from '.';

export interface PeopleResponse {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}

interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: KnownForDepartment;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  known_for: KnownFor[];
}

interface KnownFor {
  adult: boolean;
  backdrop_path: null | string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: null | string;
  media_type: MediaType;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: Date;
  origin_country?: string[];
}

type KnownForDepartment = 'Acting' | 'Directing' | 'Writing' | 'Production';
