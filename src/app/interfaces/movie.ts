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
  studios?: string[];
  producers?: string[];
  winner: boolean;
}

export interface YearsList {
  years: Years[];
}

export interface Years {
  year: number;
  winnerCount: number;
}

export interface StudiosList {
  studios: Studio[];
}

export interface Studio {
  name: string;
  winCount: number;
}

export interface Interval {
  min: IntervalValue;
  max: IntervalValue;
}

export interface IntervalValue {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}
