import type { Image, Department } from '.';

export interface FullPerson {
  adult: boolean;
  alsoKnownAs: string[];
  biography: string;
  birthday: Date;
  deathday: null;
  gender: number;
  homepage: null;
  id: number;
  imdbID: string;
  knownForDepartment: string;
  name: string;
  placeOfBirth: string;
  popularity: number;
  profilePath: string;
}

interface PersonImage {
  id: number;
  profiles: Image[];
}

interface PersonMovieCredits {
  cast: FullCast[];
  crew: FullCast[];
  id: number;
}

interface FullCast {
  adult: boolean;
  backdropPath: null | string;
  genreIDS: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: null | string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  character?: string;
  creditID: string;
  order?: number;
  department?: Department;
  job?: string;
}
