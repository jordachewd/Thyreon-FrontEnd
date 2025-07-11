import { BillingCycle } from "./billing-cycle.d";
import { PlanName } from "./plan-name.d";

export interface PlanCheckout {
  id: number;
  name: PlanName;
  billing: BillingCycle;
  price: number;
}
