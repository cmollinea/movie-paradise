export interface Person {
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

interface Image {
  aspectRatio: number;
  height: number;
  iso639_1: null;
  filePath: string;
  voteAverage: number;
  voteCount: number;
  width: number;
}

interface PersonMovieCredits {
  cast: Cast[];
  crew: Cast[];
  id: number;
}

interface Cast {
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

type Department =
  | 'Camera'
  | 'Crew'
  | 'Directing'
  | 'Editing'
  | 'Production'
  | 'Sound'
  | 'Writing';

interface PersonTVCredits {
  cast: TVCast[];
  crew: TVCast[];
  id: number;
}

interface TVCast {
  adult: boolean;
  backdropPath: null | string;
  genreIDS: number[];
  id: number;
  originCountry: string[];
  originalLanguage: string;
  originalName: string;
  overview: string;
  popularity: number;
  posterPath: null | string;
  firstAirDate: string;
  name: string;
  voteAverage: number;
  voteCount: number;
  character?: string;
  creditID: string;
  episodeCount: number;
  department?: string;
  job?: string;
}
