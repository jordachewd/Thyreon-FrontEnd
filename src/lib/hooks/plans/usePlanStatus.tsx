import { useMemo } from "react";
import { PlanCardInterface } from "@/types/plan/plan-card.d";
import { PlanStatus } from "@/types/plan/plan-status.d";
import { PlanName } from "@/types/plan/plan-name.d";
import { TransactionType } from "@/types/transactions/transaction.d";

interface PlanStatusParams {
  isYearly: boolean;
  isSignedIn?: boolean;
  plan: PlanCardInterface;
  userPlan: TransactionType | undefined;
}

export function usePlanStatus({
  plan,
  isYearly,
  isSignedIn = false,
  userPlan,
}: PlanStatusParams): PlanStatus {
  return useMemo(() => {
    const planName = plan.name as PlanName;
    const { billing, plan: userPlanName } = userPlan || {};
    const interval = billing === (isYearly ? "yearly" : "monthly");

    let isCurrent = false;
    let isPopular = false;

    if (planName === "lite") {
      isCurrent = planName === userPlanName || !userPlanName;
    }

    if (planName === "pro") {
      isPopular = true;
      isCurrent = planName === userPlanName && interval;
    }

    if (planName === "premium") {
      isCurrent = planName === userPlanName && interval;
    }

    isCurrent = isCurrent && isSignedIn;

    return { isCurrent, isPopular };
  }, [plan, isYearly, isSignedIn, userPlan]);
}
