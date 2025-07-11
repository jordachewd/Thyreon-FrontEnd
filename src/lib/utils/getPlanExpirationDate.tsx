import { BillingCycle } from "@/types/plan/billing-cycle.d";
import { PlanName } from "@/types/plan/plan-name.d";

export function getPlanExpirationDate(
  plan: PlanName,
  billing?: BillingCycle
): Date {
  const currentDate = new Date();
  let expiresOn: Date = new Date();

  switch (plan) {
    case "lite":
      expiresOn = new Date(currentDate.setDate(currentDate.getDate() + 3));
      break;
    case "pro":
    case "premium":
      switch (billing) {
        case "monthly":
          expiresOn = new Date(
            currentDate.setMonth(currentDate.getMonth() + 1)
          );
          break;
        case "yearly":
          expiresOn = new Date(
            currentDate.setFullYear(currentDate.getFullYear() + 1)
          );
          break;
      }
      break;
  }

  return expiresOn;
}
