export interface Prize {
  createdAt: string;
  id: number;
  periodId: number;
  prize: PrizeDetails;
  prizeId: number;
  shuffleState: object | null;
  success: boolean;
}

interface PrizeDetails {
  amount: number;
  bonus: boolean;
  cashoutable: boolean;
  groupId: string;
  id: number;
  name: string;
  price: number;
  sequenceld: number;
  type: string;
  value: number;
}
