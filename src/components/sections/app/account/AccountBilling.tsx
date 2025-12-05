import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { AccountBillingType } from "@/types/account/account-billing.d";
import { Typography } from "@mui/material";
import AccountWrapper from "./AccountWrapper";
import css from "@/styles/sections/admin/AccountBilling.module.css";

export default function AccountBilling(props: AccountBillingType) {
  const {
    transactions,
    userPlanId,
    title,
    alignTitle,
    titleSize,
    loading,
    error,
  } = props;

  if (loading) {
    return (
      <AccountWrapper
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        <LoadingBubbles />
      </AccountWrapper>
    );
  }

  if (error) {
    return (
      <AccountWrapper
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        <ErrorCard mini error={error.message} title="" />
      </AccountWrapper>
    );
  }

  if (!transactions) {
    return (
      <AccountWrapper
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        <Typography variant="body2" className="text-slate-600!">
          No transactions yet.
        </Typography>
      </AccountWrapper>
    );
  }

  return (
    <AccountWrapper title={title} alignTitle={alignTitle} titleSize={titleSize}>
      <div className={css.table}>
        <div className={css.tableHead}>
          <p className="flex-1">Plan</p>
          <p className="flex-1 text-center">Amount</p>
          <p className="flex-1 text-center">Paid</p>
          <p className="hidden md:flex flex-1 text-center">Purchased</p>
          <p className="hidden md:flex flex-1 text-center">Expires</p>
          <p className="min-w-14 text-center">Status</p>

          <TooltipArrow title="Available soon" placement="top">
            <i className="bi bi-cloud-download ml-4 text-base text-red-500"></i>
          </TooltipArrow>
        </div>

        {transactions.map((txn) => {
          const isActive = txn.stripeId === userPlanId;
          const txnStatus = isActive ? "Active" : "Inactive";
          const txnColor = isActive ? css.active : css.inactive;
          const createdAt = getFormattedDate(txn.createdAt);
          const expiresAt = getFormattedDate(txn.expiresAt);

          return (
            <div
              key={txn.id}
              className={`${css.tableRow} ${
                isActive &&
                "font-medium text-midnight-400! dark:text-vanilla-400!"
              }`}
            >
              <p className="flex-1 capitalize">{txn.plan}</p>
              <p className="flex-1 text-center">
                {txn.amount ? "€" + txn.amount : "Free"}
              </p>
              <p className="flex-1 text-center capitalize text-xs">
                {txn.billing}
              </p>
              <p className="hidden md:flex flex-1 textxxs text-center">
                {createdAt}
              </p>
              <p className="hidden md:flex flex-1 textxxs text-center">
                {expiresAt}
              </p>
              <p className="min-w-14 textxxs text-center">
                <span className={txnColor}>{txnStatus}</span>
              </p>

              <TooltipArrow title="Invoice" placement="top">
                <i className="bi bi-file-earmark-arrow-down ml-4 text-base cursor-pointer"></i>
              </TooltipArrow>
            </div>
          );
        })}
      </div>
    </AccountWrapper>
  );
}
