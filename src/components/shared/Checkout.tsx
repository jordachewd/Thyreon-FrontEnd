"use client";

import { Button } from "@mui/material";
import { PlanStatus } from "@/types/plan/plan-status.d";
import { PlanCheckout } from "@/types/plan/plan-checkout.d";
//import { ClerkUserData } from "@/types/create-user-data.d";

interface CheckoutProps {
  plan: PlanCheckout;
  // clerkUser: ClerkUserData;
  planStatus: PlanStatus;
}

const Checkout = ({ plan, planStatus }: CheckoutProps) => {
  const { isIncluded, isCurrent } = planStatus as PlanStatus;

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
