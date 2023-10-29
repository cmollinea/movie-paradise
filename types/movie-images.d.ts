export interface MovieImages {
  backdrops: Image[];
  id: number;
  logos: Image[];
  posters: Image[];
}

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: null | string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
