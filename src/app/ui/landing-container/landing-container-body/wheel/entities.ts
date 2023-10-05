export function checkDate(item: any) {
  const hisstoryDate = new Date(item.createdAt);
  const fromDate = new Date('2023-06-05T00:00:00.152Z');
  return fromDate.getTime() < hisstoryDate.getTime();
}
