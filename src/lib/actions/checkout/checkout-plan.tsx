"use server";

import { post } from "@/lib/api/post";
import { PlanCheckout } from "@/types/plan/plan-checkout.d";

export default async function checkoutPlan(plan: PlanCheckout) {
  return post("checkout/session", plan);
}
