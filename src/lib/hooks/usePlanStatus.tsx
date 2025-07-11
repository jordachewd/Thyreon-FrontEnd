import { useMemo } from "react";
import { PlanCardInterface } from "@/types/plan/plan-card.d";
import { PlanStatus } from "@/types/plan/plan-status.d";
import { PlanName } from "@/types/plan/plan-name.d";
import { Transaction } from "@/types/transactions/transaction.d";

interface PlanStatusParams {
  isYearly: boolean;
  isSignedIn?: boolean;
  plan: PlanCardInterface;
  userPlan: Transaction | undefined;
}

export function usePlanStatus({
  plan,
  isYearly,
  isSignedIn = false,
  userPlan,
}: PlanStatusParams): PlanStatus {
  return useMemo(() => {
    const planName = plan.name as PlanName;
    const { billing } = userPlan || {};
    const interval = billing === (isYearly ? "yearly" : "monthly");

    let isCurrent = false;
    let isPopular = false;

    if (planName === "lite") {
      isCurrent = planName === userPlan?.plan || !userPlan?.plan;
    }

    if (planName === "pro") {
      isCurrent = planName === userPlan?.plan && interval;
    }

    if (planName === "premium") {
      isCurrent = planName === userPlan?.plan && interval;
      isPopular = true;
    }

    isCurrent = isCurrent && isSignedIn;

    return { isCurrent, isPopular };
  }, [plan, isYearly, isSignedIn, userPlan]);
}
