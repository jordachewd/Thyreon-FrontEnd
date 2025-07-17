import css from "@/styles/shared/PlanCard.module.css";
import CheckoutBtn from "./CheckoutBtn";
import { Typography } from "@mui/material";
import { PlanCardInterface } from "@/types/plan/plan-card.d";
import { PlanStatus } from "@/types/plan/plan-status.d";
import { PlanCheckout } from "@/types/plan/plan-checkout.d";
import { usePlanPrice } from "@/lib/hooks/usePlanPrice";
import { usePlanStatus } from "@/lib/hooks/usePlanStatus";
import { Transaction } from "@/types/transactions/transaction.d";
import { memo } from "react";

interface PlanCardProps {
  save: number;
  plan: PlanCardInterface;
  isSignedIn?: boolean;
  isYearly?: boolean;
  userPlan?: Transaction | undefined;
}

function PlanCard({
  save,
  plan,
  isSignedIn = false,
  isYearly = false,
  userPlan = undefined,
}: PlanCardProps) {
  const planPrice = usePlanPrice({ price: plan.price || 0, isYearly, save });

  const planStatus = usePlanStatus({
    plan,
    isYearly,
    userPlan,
    isSignedIn,
  });

  const { isCurrent, isPopular } = planStatus as PlanStatus;
  const planType = isCurrent ? css.current : isPopular && css.popular;
  const planBadge = isCurrent ? "Current" : "Popular";

  return (
    <div className={`${css.wrapper} ${planType}`}>
      {(isPopular || isCurrent) && (
        <div className={css.planBadge}>{planBadge}</div>
      )}

      <div className={css.head}>
        <Typography variant="h5" className={css.title}>
          {plan.name}
        </Typography>

        <Typography variant="body1" className={css.subtitle}>
          {plan.desc}
        </Typography>

        <div className={css.priceBox}>
          <Typography variant="h3" className={css.price}>
            <span className="flex">
              {plan.price !== 0 ? "€" + planPrice : "Free"}
            </span>

            {plan.price !== 0 && (
              <span className="flex text-sm opacity-80 self-end">
                {isYearly ? "/Yr" : "/Mo"}
              </span>
            )}
          </Typography>
          {save > 0 && isYearly && plan.price !== 0 && (
            <span className="flex line-through opacity-70">
              €{plan.price * 12} /Yr
            </span>
          )}
        </div>
      </div>
      <div className={css.features}>
        <p className="flex font-bold mb-2">What is included:</p>
        {plan.features.map((feature) => (
          <div key={plan.name + feature.label} className={css.feature}>
            <i
              className={`bi ${
                feature.isIncluded
                  ? "bi-check2 text-leafGreen-400"
                  : "bi-x text-slate-400"
              }`}
            ></i>
            <p className={`${!feature.isIncluded && "text-gray-400"}`}>
              {feature.label}
            </p>
          </div>
        ))}
      </div>

      {isSignedIn && (
        <div className={css.actions}>
          <CheckoutBtn
            isCurrent={isCurrent}
            plan={
              {
                name: plan.name,
                price: planPrice,
                billing: isYearly ? "yearly" : "monthly",
              } as PlanCheckout
            }
          />
        </div>
      )}
    </div>
  );
}

export default memo(PlanCard);
