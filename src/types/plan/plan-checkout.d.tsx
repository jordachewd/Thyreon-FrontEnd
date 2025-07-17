import { BillingCycle } from "./billing-cycle.d";
import { PlanName } from "./plan-name.d";

export interface PlanCheckout {
  name: PlanName;
  price: number;
  billing: BillingCycle;
}
