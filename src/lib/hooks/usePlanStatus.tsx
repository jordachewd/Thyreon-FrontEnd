import { useMemo } from "react";
import { Plan, PlanData, PlanStatus } from "@/types/plan-data.d";

interface PlanStatusParams {
  plan: Plan;
  yearly: boolean;
  planFee: number;
  userPlan?: PlanData;
}

export function usePlanStatus({
  plan,
  yearly,
  planFee,
  userPlan,
}: PlanStatusParams): PlanStatus {
  return useMemo(() => {
    const planId = Number(plan.id);
    const { id: userPlanId, billing, amount } = userPlan || {};
    const prevPlans = Number(planFee) <= Number(amount);

    const billingCycle = billing === (yearly ? "Yearly" : "Monthly");
    const isIncluded = prevPlans && planId <= Number(userPlanId);

    let isCurrent = false;
    let isPopular = false;

    if (planId === 0) {
      isCurrent = planId === Number(userPlanId);
    }

    if (planId === 1) {
      isCurrent = billingCycle && planId === Number(userPlanId);
      isPopular = (!isIncluded && Number(userPlanId) === 0) || !userPlanId;
    }

    if (planId === 2) {
      isCurrent = billingCycle && planId === Number(userPlanId);
      isPopular = !isIncluded && [1, 2].includes(Number(userPlanId));
    }

    return { isIncluded, isCurrent, isPopular };
  }, [plan.id, yearly, planFee, userPlan]);
}
