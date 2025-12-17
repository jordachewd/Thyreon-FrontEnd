import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { AccountBillingType } from "@/types/account/account-billing.d";
import { Typography, Tooltip } from "@/components/ui";
import AccountWrapper from "./AccountWrapper";

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
      <div className="account-table">
        <div className="account-table-head">
          <p className="flex-1">Plan</p>
          <p className="flex-1 text-center">Amount</p>
          <p className="flex-1 text-center">Paid</p>
          <p className="hidden md:flex flex-1 text-center">Purchased</p>
          <p className="hidden md:flex flex-1 text-center">Expires</p>
          <p className="min-w-14 text-center">Status</p>

          <Tooltip title="Available soon">
            <i className="bi bi-cloud-download ml-4 text-base text-red-500"></i>
          </Tooltip>
        </div>

        {transactions.map((txn) => {
          const isActive = txn.stripeId === userPlanId;
          const txnStatus = isActive ? "Active" : "Inactive";
          const txnColor = isActive ? "account-active" : "account-inactive";
          const createdAt = getFormattedDate(txn.createdAt);
          const expiresAt = getFormattedDate(txn.expiresAt);

          return (
            <div
              key={txn.id}
              className={`account-table-row ${
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

              <Tooltip title="Invoice">
                <i className="bi bi-file-earmark-arrow-down ml-4 text-base cursor-pointer"></i>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </AccountWrapper>
  );
}
