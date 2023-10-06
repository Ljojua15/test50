export function whichAction(
  par: 'isBooster' | 'isSale' | 'rules'
): boolean | string {
  const date = new Date();

  const boosterStart = new Date('OCT 07, 2023 10:00:00');
  const boosterEnd = new Date('OCT 08, 2023 09:59:00');

  const saleStart = new Date('AUG 12, 2023 13:00:00');
  const saleEnd = new Date('AUG 14, 2023 09:59:00');

  const isBooster =
    boosterStart.getTime() <= date.getTime() &&
    boosterEnd.getTime() >= date.getTime();
  const isSale =
    saleStart.getTime() <= date.getTime() &&
    saleEnd.getTime() >= date.getTime();

  const rulesId = isBooster
    ? 'bonusworldbooster'
    : isSale
    ? 'bonusspace'
    : 'bonusspace';

  return par === 'isBooster' ? isBooster : par === 'isSale' ? isSale : rulesId;
}
