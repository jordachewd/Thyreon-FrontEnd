import { BillingCycle } from "./billing-cycle.d";
import { PlanName } from "./plan-name.d";

export interface PlanData {
  id: string;
  name: PlanName;
  amount: number;
  billing: BillingCycle;
  expiresOn?: Date;
  startedOn?: Date;
  stripeId?: string;
}
