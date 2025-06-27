// ====== TRANSACTION Data Types

import { GetUserData } from "./get-user-data.d";
import { BillingCycle, CheckoutPlanParams, PlanName } from "./plan-data.d";

export interface CreateTransactionParams {
  stripeId: string;
  userId: string;
  clerkId: string;
  createdAt: Date;
  expiresOn: Date;
  plan: PlanName;
  billing: BillingCycle;
  amount: number;
}

export interface CheckoutTransactionParams {
  user: GetUserData;
  plan: CheckoutPlanParams;
}

export interface Transaction {
  id: string;
  plan: PlanName;
  amount: number;
  createdAt: Date;
  expiresOn: Date;
  billing: BillingCycle;
  stripeId: string;
}
