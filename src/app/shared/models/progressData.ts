export interface ProgressData {
  levels: Levels[];
  amount: number;
}

interface Levels {
  step: number;
  points: number;
  imageState: string;
}
