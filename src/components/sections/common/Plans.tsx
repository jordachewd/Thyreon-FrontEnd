"use client";

import css from "@/styles/sections/shared/Plans.module.css";
import { useEffect, useState } from "react";
import { plans } from "@/constants/plans.const";
import { PlanCardInterface } from "@/types/plan/plan-card.d";
import { Transaction } from "@/types/transactions/transaction.d";
import { useUser } from "@clerk/nextjs";
import { useAdminContext } from "@/context/admin/AdminContext";
import { NODE_ENV } from "@/constants/api/node-env.const";
import PlansWrapper from "@/components/sections/admin/plans/PlansWrapper";
import ErrorCard from "@/components/shared/ErrorCard";
import PlanCard from "@/components/shared/PlanCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

function Plans() {
  const { isSignedIn } = useUser();

  const { data, loading, error } = useAdminContext().meCtx;
  const [planType, setPlanType] = useState<boolean>(false);

  const cssMonthly = !planType ? css.switched : "";
  const cssYearly = planType ? css.switched : "";
  const save: number = 0.3; // Save 30% on Yearly plans

  const currentPlan: Transaction | undefined = data?.me?.currentPlan;
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

  const pageTitle = isSignedIn ? "Upgrade your plan" : "Choose your plan";
  const pageSubtitle = "Select the plan that suits your needs.";

  return (
    <PlansWrapper title={pageTitle} subtitle={pageSubtitle}>
      <>
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
      </>
    </PlansWrapper>
  );
}

export default Plans;
