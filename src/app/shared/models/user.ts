export interface User {
  name: string;
  prizes: Array<Prizes>;
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
  steps: Array<Step>;
  used: number;
}

interface Step {
  points: number;
  step: number;
}

interface Prizes {
  amount: number;
  id: number;
  name: string;
  price: number;
  type: string;
  value: number;
}
