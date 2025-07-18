"use client";

import css from "@/styles/sections/shared/Plans.module.css";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { plans } from "@/constants/plans.const";
import { PlanCardInterface } from "@/types/plan/plan-card.d";
import { Transaction } from "@/types/transactions/transaction.d";
import { gql, useQuery } from "@apollo/client";
import { GetUserData } from "@/types/users/get-user-data.d";
import PlansWrapper from "@/components/sections/admin/plans/PlansWrapper";
import ErrorCard from "@/components/shared/ErrorCard";
import PageHead from "@/components/shared/PageHead";
import PlanCard from "@/components/shared/PlanCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

const GET_MY_CURRENT_PLAN_QUERY = gql`
  query GetMe {
    me {
      currentPlan {
        plan
        billing
      }
    }
  }
`;

function Plans() {
  const { isSignedIn } = useUser();
  const [planType, setPlanType] = useState<boolean>(false);

  const cssMonthly = !planType ? css.switched : "";
  const cssYearly = planType ? css.switched : "";
  const save: number = 0.3; // Save 30% on Yearly plans

  const { data, loading, error } = useQuery<{ me: GetUserData }>(
    GET_MY_CURRENT_PLAN_QUERY,
    {
      skip: !isSignedIn,
    }
  );

  const currentPlan: Transaction | undefined = data?.me.currentPlan;
  const billingType = currentPlan?.billing;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPlanType(event.target.checked);
  };

  useEffect(() => {
    if (!isSignedIn && !billingType) return;
    const setBilling = billingType === "yearly" ? true : false;
    setPlanType(setBilling);
  }, [isSignedIn, billingType]);

  if (isSignedIn && loading)
    return (
      <PlansWrapper title={`${isSignedIn ? "Upgrade" : "Choose"} your plan`}>
        <LoadingBubbles wrapped />
      </PlansWrapper>
    );

  if (isSignedIn && error)
    return (
      <PlansWrapper title={`${isSignedIn ? "Upgrade" : "Choose"} your plan`}>
        <ErrorCard error={error.message} title="" backToUrl="" />
      </PlansWrapper>
    );

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

export default Plans;
