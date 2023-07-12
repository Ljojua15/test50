export interface CashOut {
  exchangeOptions: ExchangeOptions[];
  totalAmount: number;
}

export interface ExchangeOptions {
  id: string;
  multiplier: number;
  value: number;
  amount: number;
  amountBeforeMultiplier: number;
  combination: number[];
}
