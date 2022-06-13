export interface User {
  name: string;
  prizes: [];
  type: string;
  state: State;
}

export interface State {
  available: number;
  currentStepIndex: number;
  points: number;
  progress: number;
  steps: [];
}
