export default function getFormattedDate(date: string | number | Date): string {
  if (!date) {
    throw new Error("Date is undefined in getFormattedDate()!");
  }

  const parsedDate = new Date(date);
  const dateOptions: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
  };

  return new Intl.DateTimeFormat("en-GB", dateOptions).format(parsedDate);
}
