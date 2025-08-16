"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import PlanCard from "@/components/shared/PlanCard";
import { NODE_ENV } from "@/constants/api/node-env.const";
import { plans } from "@/constants/plans.const";
import { useUserPlan } from "@/lib/hooks/users/useUserPlan";
import { PlanCardInterface } from "@/types/plan/plan-card.d";
import { useUser } from "@clerk/nextjs";
import { Switch, Button } from "@mui/material";
import { useState, useEffect } from "react";
import css from "@/styles/sections/shared/Plans.module.css";
import PlansWrapper from "../admin/plans/PlansWrapper";

type PlansProps = {
  className?: string;
};

function Plans(props: PlansProps) {
  const { isSignedIn } = useUser();
  const [planType, setPlanType] = useState<boolean>(false);

  const { currentPlan, loading, error } = useUserPlan();
  const billingType = currentPlan?.billing;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPlanType(event.target.checked);
  };

  useEffect(() => {
    if (!isSignedIn && !billingType) return;
    const setBilling = billingType === "yearly" ? true : false;
    setPlanType(setBilling);
  }, [isSignedIn, billingType]);

  if (loading)
    return (
      <PlansWrapper title="Loading plans...">
        <LoadingBubbles wrapped />
      </PlansWrapper>
    );

  if (error)
    return (
      <PlansWrapper title="Error loading plans">
        <ErrorCard error={error.message} title="" backToUrl="" />
      </PlansWrapper>
    );

  const wrapperCss = props.className;
  const cssMonthly = !planType ? css.switched : "";
  const cssYearly = planType ? css.switched : "";
  const save: number = 0.3; // Save 30% on Yearly plans
  const pageTitle = isSignedIn ? "Upgrade your plan" : "Choose your plan";
  const pageSubtitle = "Select the plan that suits your needs.";

  return (
    <PlansWrapper
      title={pageTitle}
      subtitle={pageSubtitle}
      className={wrapperCss}
    >
      <div className={css.switch}>
        <p className={cssMonthly}>Monthly</p>
        <Switch
          size="small"
          checked={planType}
          onChange={handleChange}
          slotProps={{
            input: {
              "aria-label": "controlled",
            },
          }}
        />
        <p className={cssYearly}>Yearly</p>
        {save > 0 && <span className={css.bubble}>Save {save * 100}%</span>}
      </div>

      <div className={css.plans}>
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
        <div className={css.planActions}>
          <Button
            size="large"
            variant="contained"
            href="/sign-up"
            sx={{ minWidth: 280, marginTop: "1rem" }}
            disabled={NODE_ENV !== "development"}
          >
            Get Started
          </Button>
        </div>
      )}
    </PlansWrapper>
  );
}

export default Plans;
