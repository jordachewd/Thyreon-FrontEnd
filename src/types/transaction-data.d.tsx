// ====== TRANSACTION Data Types

import { BillingCycle, CheckoutPlanParams, PlanName } from "./plan-data.d";
import { ClerkUserData } from "./user-data.d";

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
  user: ClerkUserData;
  plan: CheckoutPlanParams;
}

export interface Transaction {
  id: string;
  plan: string;
  amount: number;
  createdAt: Date;
  expiresOn: Date;
  billing: BillingCycle;
  stripeId: string;
}
