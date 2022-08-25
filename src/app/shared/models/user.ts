export interface User {
  name: string;
  prizes: Array<any>;
  state: State;
  type: string;
}

interface State {
  available: number;
  bonus: object;
  currentStepIndex: number;
  groupDetails: Object;
  lastStepReached: boolean;
  points: number;
  progress: number;
  steps: Array<any>;
  used: number;
}
