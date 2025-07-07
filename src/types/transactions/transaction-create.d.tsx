import { BillingCycle } from "../plan/billing-cycle.d";
import { PlanName } from "../plan/plan-name.d";

export interface CreateTransaction {
  stripeId: string;
  userId: string;
  clerkId: string;
  createdAt: Date;
  expiresOn: Date;
  plan: PlanName;
  billing: BillingCycle;
  amount: number;
}
