export interface GetMoviesParams {
  page: number;
  size: number;
  winner?: boolean;
  year?: number;
}

export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface GetMoviesResponse {
  content: Movie[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
