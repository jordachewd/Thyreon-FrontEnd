"use client";

import { useAdminUi } from "@/context/AdminUiContext";
import checkoutPlan from "@/lib/actions/checkout/checkout-plan";
import { PlanCheckout } from "@/types/plan/plan-checkout.d";
import Button from "@mui/material/Button";
import { memo } from "react";

interface CheckoutProps {
  plan: PlanCheckout;
  isCurrent?: boolean;
}

function CheckoutBtn({ plan, isCurrent = false }: CheckoutProps) {
  const { alertCtx } = useAdminUi();
  const { updateAlert } = alertCtx;

  const handleCheckout = async () => {
    try {
      const session = await checkoutPlan(plan);

      if (!session?.id) {
        updateAlert({
          text: "Invalid session response. Please try again.",
          severity: "error",
        });
        return;
      }

      if (!session?.url) {
        updateAlert({
          text: "Checkout session missing URL. Try again.",
          severity: "error",
        });
        return;
      }

      window.location.href = session.url;
    } catch (error) {
      console.error("Checkout error:", error);
      updateAlert({
        text: "Failed to initiate checkout. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isCurrent}
      sx={{
        paddingLeft: "3rem",
        paddingRight: "3rem",
      }}
      variant="outlined"
    >
      {(isCurrent && "Current") || "Subscribe"}
    </Button>
  );
}

export default memo(CheckoutBtn);
