export interface Credits {
  id: number;
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
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

export type Department =
  | 'Acting'
  | 'Crew'
  | 'Production'
  | 'Directing'
  | 'Writing'
  | 'Sound'
  | 'Camera'
  | 'Art'
  | 'Editing'
  | 'Costume & Make-Up'
  | 'Visual Effects'
  | 'Lighting';
