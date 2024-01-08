export interface GenresResponse {
  genres: Genre[];
}

interface Genre {
  id: number;
  name: string;
}
