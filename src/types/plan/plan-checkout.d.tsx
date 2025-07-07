import { BillingCycle } from "./billing-cycle.d";
import { PlanName } from "./plan-name.d";

export interface PlanCheckout {
  id: number;
  billing: BillingCycle;
  name: PlanName;
  price: number;
}
