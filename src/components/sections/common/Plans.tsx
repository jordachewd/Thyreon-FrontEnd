"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import PlanCard from "@/components/shared/PlanCard";
import { NODE_ENV } from "@/constants/api/node-env.const";
import { plans } from "@/constants/demo-data/plans.const";
import { PlanCardInterface } from "@/types/plan/plan-card.d";
import { TransactionType } from "@/types/transactions/transaction.d";
import { useUser } from "@clerk/nextjs";
import { Switch, Button } from "@/components/ui";
import { useState, useEffect, memo, useCallback } from "react";
import Link from "next/link";
import PlansWrapper from "../app/plans/PlansWrapper";

type PlansProps = {
  className?: string;
  currentPlan?: TransactionType;
  error?: string;
};

function Plans({ className, currentPlan, error }: PlansProps) {
  const { isSignedIn } = useUser();
  const [planType, setPlanType] = useState<boolean>(false);

  const billingType = currentPlan?.billing;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setPlanType(event.target.checked);
    },
    [setPlanType]
  );

  useEffect(() => {
    if (!isSignedIn && !billingType) return;
    const setBilling = billingType === "yearly" ? true : false;
    setPlanType(setBilling);
  }, [isSignedIn, billingType]);

  if (isSignedIn && error)
    return (
      <PlansWrapper title="Error loading plans">
        <ErrorCard error={error} />
      </PlansWrapper>
    );

  const wrapperCss = className;
  const cssMonthly = !planType ? "plans-switched" : "";
  const cssYearly = planType ? "plans-switched" : "";
  const save: number = 0.3; // Save 30% on Yearly plans
  const pageTitle = isSignedIn ? "Upgrade your plan" : "Choose your plan";
  const pageSubtitle = "Select the plan that suits your needs.";

  return (
    <PlansWrapper
      title={pageTitle}
      subtitle={pageSubtitle}
      className={wrapperCss}
    >
      <div className="plans-switch">
        <p className={cssMonthly}>Monthly</p>
        <Switch
          size="small"
          checked={planType}
          onChange={handleChange}
          aria-label="Toggle plan billing type"
        />
        <p className={cssYearly}>Yearly</p>
        {save > 0 && <span className="plans-bubble">Save {save * 100}%</span>}
      </div>

      <div className="plans-list">
        {plans.map((plan: PlanCardInterface) => {
          return (
            <PlanCard
              key={plan.id}
              plan={plan}
              save={save}
              isYearly={planType}
              isSignedIn={isSignedIn}
              userPlan={currentPlan}
            />
          );
        })}
      </div>

      {!isSignedIn && (
        <div className="plans-actions">
          <Link href="/sign-up">
            <Button
              size="large"
              variant="primary"
              disabled={NODE_ENV !== "development"}
            >
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </PlansWrapper>
  );
}

export default memo(Plans);
