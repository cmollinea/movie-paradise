export interface CollectionResponse {
  page: number;
  results: Collection[];
  total_pages: number;
  total_results: number;
}

interface Collection {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
}
