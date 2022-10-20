export interface ProgressData {
  levels: Levels[];
  amount: number;
}

export interface Levels {
  step: number;
  points: number;
  imageState: string;
}
