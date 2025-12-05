interface PlanPriceParams {
  price: number;
  isYearly: boolean;
  save?: number;
}

export function getPlanPrice({
  price,
  isYearly,
  save = 0,
}: PlanPriceParams): number {
  return price === 0
    ? price
    : isYearly
    ? Math.round(price * 12 * (1 - save))
    : price;
}
