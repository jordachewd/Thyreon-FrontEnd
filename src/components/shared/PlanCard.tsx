import CheckoutBtn from "./CheckoutBtn";
import { Typography } from "@/components/ui";
import { PlanCardInterface } from "@/types/plan/plan-card.d";
import { PlanStatus } from "@/types/plan/plan-status.d";
import { PlanCheckout } from "@/types/plan/plan-checkout.d";
import { getPlanPrice } from "@/lib/hooks/plans/get-plan-price";
import { getPlanStatus } from "@/lib/hooks/plans/get-plan-status";
import { TransactionType } from "@/types/transactions/transaction.d";

interface PlanCardProps {
  save: number;
  plan: PlanCardInterface;
  isSignedIn?: boolean;
  isYearly?: boolean;
  userPlan?: TransactionType | undefined;
}

export default function PlanCard({
  save,
  plan,
  isSignedIn = false,
  isYearly = false,
  userPlan = undefined,
}: PlanCardProps) {
  const planPrice = getPlanPrice({ price: plan.price || 0, isYearly, save });
  const planStatus = getPlanStatus({
    plan,
    isYearly,
    userPlan,
    isSignedIn,
  });

  const { isCurrent, isPopular } = planStatus as PlanStatus;
  const planBadge = isCurrent ? "Current" : "Popular";
  
  const wrapperClass = `flex flex-col w-full rounded-lg shadow-xl ease-in-out relative overflow-hidden px-4 lg:px-8 py-10 gap-4 bg-vanilla-200 dark:bg-midnight-700 transition-all duration-300 font-medium ${
    isCurrent ? 'bg-vanilla-400 dark:bg-midnight-400' : 
    isPopular ? 'text-vanilla-100 dark:text-midnight-800 bg-midnight-400 dark:bg-vanilla-400' : ''
  }`;
  
  const titleClass = isPopular ? 'flex w-full capitalize text-vanilla-100 dark:text-midnight-800' : 'flex w-full capitalize';
  const subtitleClass = isPopular ? 'flex w-full !text-xs pl-0.5 min-h-12 opacity-80 text-vanilla-100 dark:text-midnight-800' : 'flex w-full !text-xs pl-0.5 min-h-12 opacity-80';
  const priceClass = isPopular ? 'flex !leading-none text-vanilla-100 dark:text-midnight-800' : 'flex !leading-none';
  const badgeClass = `flex leading-none shadow-md uppercase text-[8px] font-bold absolute top-3.5 -left-8 p-1.5 px-8 -rotate-45 tracking-widest ${
    isCurrent ? 'bg-leaf-green-400 text-white' : 'bg-orange-600 text-white'
  }`;

  return (
    <div className={wrapperClass}>
      {(isPopular || isCurrent) && (
        <div className={badgeClass}>{planBadge}</div>
      )}

      <div className="flex flex-col justify-between items-center gap-1">
        <Typography variant="h5" className={titleClass}>
          {plan.name}
        </Typography>

        <Typography variant="body1" className={subtitleClass}>
          {plan.desc}
        </Typography>

        <div className="flex w-full gap-6 items-end my-4">
          <Typography variant="h3" className={priceClass}>
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

      <div className="flex flex-col gap-2.5 w-full">
        <p className="flex font-bold mb-2">What is included:</p>
        
        {plan.features.map((feature) => (
          <div key={plan.name + feature.label} className="flex items-center gap-4 text-xs">
            <i
              className={`bi ${
                feature.isIncluded
                  ? "bi-check2 text-leaf-green-400"
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
        <div className="flex justify-center items-center mt-6">
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
