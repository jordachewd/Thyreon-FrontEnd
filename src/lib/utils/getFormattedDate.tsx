export default function getFormattedDate(date: string | number | Date): string {
  if (!date) {
    return "Invalid date";
  }

  const parsedDate = new Date(date);
  const dateOptions: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
  };

  return new Intl.DateTimeFormat("en-GB", dateOptions).format(parsedDate);
}
