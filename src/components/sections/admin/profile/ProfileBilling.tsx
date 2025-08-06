"use client";

import css from "@/styles/sections/admin/ProfileBilling.module.css";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { memo, useMemo } from "react";
import ErrorCard from "@/components/shared/ErrorCard";
import ProfileBillingWrapper from "./ProfileBillingWrapper";
import Typography from "@mui/material/Typography";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { ProfileSectionType } from "@/types/profile/profile-section.d";

function ProfileBilling({
  data,
  loading,
  error,
  title,
  alignTitle,
  titleSize,
}: ProfileSectionType) {
  if (loading)
    return (
      <ProfileBillingWrapper
        title={title}
        alignTitle={alignTitle}
        size={titleSize}
      >
        <LoadingBubbles wrapped />
      </ProfileBillingWrapper>
    );

  if (error)
    return (
      <ProfileBillingWrapper
        title={title}
        alignTitle={alignTitle}
        size={titleSize}
      >
        <ErrorCard error={error.message} title="" backToUrl="" />
      </ProfileBillingWrapper>
    );

  const { currentPlan, transactions } = data;
  const allTxns = useMemo(() => transactions ?? [], [transactions]);
  const hasTransactions = allTxns.length > 0;

  if (!hasTransactions) {
    return (
      <ProfileBillingWrapper
        title={title}
        alignTitle={alignTitle}
        size={titleSize}
      >
        <Typography variant="body2" className="text-center text-slate-600!">
          No transactions yet.
        </Typography>
      </ProfileBillingWrapper>
    );
  }

  return (
    <ProfileBillingWrapper
      title={title}
      alignTitle={alignTitle}
      size={titleSize}
    >
      <div className={css.table}>
        <div className={css.tableHead}>
          <p className="flex-1">Plan</p>
          <p className="flex-1 text-center">Amount</p>
          <p className="flex-1 text-center">Paid</p>
          <p className="hidden md:flex flex-1 text-center">Purchased</p>
          <p className="hidden md:flex flex-1 text-center">Expires</p>
          <p className="min-w-14 text-center">Status</p>

          {/* Invoices to be developed !!! */}
          <TooltipArrow title="Available soon" placement="top">
            <i className="bi bi-cloud-download ml-4 text-base text-red-500"></i>
          </TooltipArrow>
        </div>

        {allTxns.map((txn) => {
          const isActive = txn.stripeId === currentPlan?.stripeId;
          const txnStatus = isActive ? "Active" : "Inactive";
          const txnColor = isActive ? css.active : css.inactive;

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
                {getFormattedDate(txn.createdAt)}
              </p>
              <p className="hidden md:flex flex-1 textxxs text-center">
                {getFormattedDate(txn.expiresAt)}
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
    </ProfileBillingWrapper>
  );
}

export default memo(ProfileBilling);
