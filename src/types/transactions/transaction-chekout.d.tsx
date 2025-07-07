import { PlanCheckout } from "../plan/plan-checkout.d";
import { GetUserData } from "../users/get-user-data.d";

export interface CheckoutTransaction {
  user: GetUserData;
  plan: PlanCheckout;
}
