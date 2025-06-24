export function getTimeUp(endDate: Date) {
  const startDate = new Date();
  return startDate >= new Date(endDate);
}
