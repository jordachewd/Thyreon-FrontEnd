"use client";
import css from "@/styles/sections/shared/Plans.module.css";
import { plans } from "@/constants/plans.const";
import { PlanCardInterface } from "@/types/plan/plan-card.d";
import { memo, useEffect, useState } from "react";
import PageHead from "../../shared/PageHead";
import PlanCard from "@/components/shared/PlanCard";
import LoadingBubbles from "../../shared/LoadingBubbles";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { Transaction } from "@/types/transactions/transaction.d";
import { useUser } from "@clerk/nextjs";

interface PlansProps {
  hasLoader?: boolean;
  currentPlan?: Transaction | undefined;
}

function Plans({ hasLoader = false, currentPlan = undefined }: PlansProps) {
  const isLoggedIn = useUser();
  const { isSignedIn } = isLoggedIn;

  const save: number = 0.3; // Save 30% on Yearly plans
  const [planType, setPlanType] = useState<boolean>(false);

  const cssMonthly = !planType ? css.switched : "";
  const cssYearly = planType ? css.switched : "";

  useEffect(() => {
    if (!currentPlan?.billing) return;

    const setBilling = currentPlan?.billing === "yearly" ? true : false;
    setPlanType(setBilling);
  }, [currentPlan?.billing]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPlanType(event.target.checked);
  };

  if (hasLoader && !isSignedIn) return <LoadingBubbles wrapped />;

  return (
    <div className={css.section}>
      <div className={css.content}>
        <PageHead
          title={`${isSignedIn ? "Upgrade" : "Choose"} your plan`}
          subtitle="Select the plan that suits your needs."
        />

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
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Plans);
