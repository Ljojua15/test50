export interface DailyData {
  total: number;
  bet: number;
  deposit: number;
  login: number;
  verification: number;
}

export interface FinalData {
  total: number;
  bet: number;
  deposit: number;
  betProgress: number;
  depositProgress: number;
}

export interface Response {
  data: {
    metadata: {
      date: string;
      progress: undefined;
      scope: string;
      tickets: DailyData | FinalData;
      name: string;
      type: string;
    };
  };
}
//to be continuted
