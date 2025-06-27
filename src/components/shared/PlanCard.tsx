import css from "@/styles/shared/PlanCard.module.css";
import { Plan, PlanData, PlanStatus } from "@/types/plan-data.d";
import { Typography } from "@mui/material";
import Checkout from "@/components/shared/Checkout";
import { usePlanStatus } from "@/lib/hooks/usePlanStatus";
import { GetUserData } from "@/types/get-user-data.d";

interface PlanCardProps {
  plan: Plan;
  yearly: boolean;
  userData?: GetUserData | null;
  save?: number;
}

export default function PlanCard({
  plan,
  yearly,
  userData,
  save = 0,
}: PlanCardProps) {
  const hasUserData = userData && Object.keys(userData).length > 0;

  //const { id, clerkId, username, firstName, lastName, email } = userData || {};

  const planFee =
    plan.price === 0
      ? plan.price
      : yearly
      ? Math.round(plan.price * 12 * (1 - save))
      : plan.price;

  const planStatus = usePlanStatus({
    plan,
    planFee,
    yearly,
    userPlan: {
      id: "1",
      name: "Lite",
      amount: 29,
      billing: "Monthly",
    } as PlanData /* dummy array for testing purpose */,
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
              {plan.price !== 0 ? "€" + planFee : "Free"}
            </span>

            {plan.price !== 0 && (
              <span className="flex text-sm opacity-80 self-end">
                {yearly ? "/Yr" : "/Mo"}
              </span>
            )}
          </Typography>
          {yearly && plan.price !== 0 && (
            <span className="flex line-through opacity-70">
              €{plan.price * 12} /Yr
            </span>
          )}
        </div>
      </div>
      <div className={css.features}>
        <p className="flex font-bold mb-2">What is included:</p>
        {plan.inclusions.map((incl) => (
          <div key={plan.name + incl.label} className={css.feature}>
            <i
              className={`bi ${
                incl.isIncluded
                  ? "bi-check2 text-leafGreen-400"
                  : "bi-x text-slate-400"
              }`}
            ></i>
            <p className={`${!incl.isIncluded && "text-gray-400"}`}>
              {incl.label}
            </p>
          </div>
        ))}
      </div>

      {hasUserData && (
        <div className={css.actions}>
          <Checkout
            plan={{
              id: plan.id,
              billing: yearly ? "Yearly" : "Monthly",
              name: plan.name,
              price: planFee,
            }}
            planStatus={planStatus}
            /*             clerkUser={{
              userId: id || "",
              clerkId: clerkId || "",
              username: username || "",
              firstName: firstName,
              lastName: lastName,
              email: email,
            }} */
          />
        </div>
      )}
    </div>
  );
}
