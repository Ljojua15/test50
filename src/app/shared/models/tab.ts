export interface Tab {
  header: 'CHEST' | 'WHEEL' | 'SPIN'
  text: string
  amount: number,
  gameId: 'wheel' | 'masters' | 'chest',
  isCurrent: boolean,
  translateKey: string
}
