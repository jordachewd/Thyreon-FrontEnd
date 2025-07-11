"use client";
import { Button } from "@mui/material";
import { PlanCheckout } from "@/types/plan/plan-checkout.d";
import checkoutPlan from "@/lib/actions/checkout/checkout-plan";
import getStripe from "@/lib/actions/checkout/get-stripe";
import { AlertParams } from "@/types/alert-message.interface";
import { memo, useState } from "react";
import AlertMessage from "../layout/common/AlertMessage";

interface CheckoutProps {
  plan: PlanCheckout;
  isCurrent?: boolean;
}

function CheckoutBtn({ plan, isCurrent = false }: CheckoutProps) {
  const [alert, setAlert] = useState<AlertParams | null>(null);

  const handleCheckout = async () => {
    try {
      const session = await checkoutPlan(plan);

      if (!session?.id) {
        setAlert({
          text: "Invalid session response. Please try again.",
          severity: "error",
        });
        return;
      }

      const stripe = await getStripe();
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("Checkout error:", error);
      setAlert({
        text: "Failed to initiate checkout. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <>
      {alert && <AlertMessage message={alert} />}
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
    </>
  );
}

export default memo(CheckoutBtn);
