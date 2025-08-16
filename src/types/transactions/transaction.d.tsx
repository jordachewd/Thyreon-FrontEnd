import { PlanName } from "../plan/plan-name.d";
import { BillingCycle } from "../plan/billing-cycle.d";

export interface TransactionType {
  id: number;
  userId: number;
  plan: PlanName;
  amount: number;
  billing: BillingCycle;
  stripeId: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}
