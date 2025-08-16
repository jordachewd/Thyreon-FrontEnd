import { useMemo } from "react";

interface PlanPriceParams {
  price: number;
  isYearly: boolean;
  save?: number;
}

export function usePlanPrice({
  price,
  isYearly,
  save = 0,
}: PlanPriceParams): number {
  return useMemo(() => {
    return price === 0
      ? price
      : isYearly
      ? Math.round(price * 12 * (1 - save))
      : price;
  }, [price, isYearly, save]);
}
