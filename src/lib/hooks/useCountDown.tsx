import { CountDownTypes } from "@/types/hooks/use-count-down.d";

export function useCountDown(
  startDate: Date,
  endDate: Date
): Partial<CountDownTypes> {
  if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
    throw new Error("Expiration startDate is not a valid Date object");
  }

  if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
    throw new Error("Expiration endDate is not a valid Date object");
  }

  let delta = Math.abs(endDate.getTime() - startDate.getTime()) / 1000;

  const years = Math.floor(delta / (365.25 * 24 * 60 * 60));
  delta -= years * 365.25 * 24 * 60 * 60;

  const months = Math.floor(delta / (30.44 * 24 * 60 * 60));
  delta -= months * 30.44 * 24 * 60 * 60;

  const days = Math.floor(delta / (24 * 60 * 60));
  delta -= days * 24 * 60 * 60;

  const hours = Math.floor(delta / (60 * 60));
  delta -= hours * 60 * 60;

  const minutes = Math.floor(delta / 60);
  delta -= minutes * 60;

  const seconds = Math.floor(delta);

  const result: Partial<CountDownTypes> = {};

  if (years) result.years = years;
  if (months) result.months = months;
  if (days) result.days = days;
  if (hours) result.hours = hours;
  if (minutes) result.minutes = minutes;
  if (seconds) result.seconds = seconds;

  return result;
}
