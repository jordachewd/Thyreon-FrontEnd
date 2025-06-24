"use client";

import { Button } from "@mui/material";
import { CheckoutPlanParams, PlanStatus } from "@/types/plan-data.d";
import { ClerkUserData } from "@/types/user-data.d";

interface CheckoutProps {
  plan: CheckoutPlanParams;
  clerkUser: ClerkUserData;
  planStatus: PlanStatus;
}

const Checkout = ({ planStatus }: CheckoutProps) => {
  const { isIncluded, isCurrent, isPopular } = planStatus as PlanStatus;

  return (
    <form>
      <Button
        role="link"
        type="submit"
        disabled={isIncluded}
        sx={{
          minWidth: 220,
          ...(isPopular
            ? {
                color: "var(--mui-palette-common-white)",
                borderColor: "var(--mui-palette-common-white)",
                "&:hover": {
                  color:
                    "rgba(var(--mui-palette-error-contrastTextChannel) / 0.75)!important",
                  borderColor:
                    "rgba(var(--mui-palette-error-contrastTextChannel) / 0.75)",
                },
              }
            : {}),
          "&.Mui-disabled": {
            color: isCurrent
              ? "rgba(var(--mui-palette-tertiary-contrastTextChannel) / 0.5)"
              : "rgba(var(--mui-palette-tertiary-mainChannel) / 0.5)",
          },
        }}
        variant={
          (isPopular && "outlined") || (isIncluded && "text") || "outlined"
        }
      >
        {(isCurrent && "Current") || (isIncluded && "Included") || "Subscribe"}
      </Button>
    </form>
  );
};

export default Checkout;
