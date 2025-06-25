"use client";

import { Button } from "@mui/material";
import { CheckoutPlanParams, PlanStatus } from "@/types/plan-data.d";
import { ClerkUserData } from "@/types/user-data.d";

interface CheckoutProps {
  plan: CheckoutPlanParams;
  clerkUser: ClerkUserData;
  planStatus: PlanStatus;
}

const Checkout = ({ plan, planStatus }: CheckoutProps) => {
  const { isIncluded, isCurrent, isPopular } = planStatus as PlanStatus;

  console.log("Plan: ", plan.name);
  console.log("Plan Status: ", planStatus);

  return (
    <form>
      <Button
        type="submit"
        disabled={isIncluded || isCurrent}
        sx={{
          paddingLeft: "3rem",
          paddingRight: "3rem",
        }}
        variant="outlined"
      >
        {(isCurrent && "Current") || (isIncluded && "Included") || "Subscribe"}
      </Button>
    </form>
  );
};

export default Checkout;
