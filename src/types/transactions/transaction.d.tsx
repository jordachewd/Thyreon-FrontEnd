import { PlanName } from "../plan/plan-name.d";
import { BillingCycle } from "../plan/billing-cycle.d";

export interface Transaction {
  id: string;
  plan: PlanName;
  amount: number;
  billing: BillingCycle;
  stripeId: string;
  createdAt: Date;
  expiresOn: Date;
}
