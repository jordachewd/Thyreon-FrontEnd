"use client";

import css from "@/styles/sections/admin/AccountBilling.module.css";
import { memo } from "react";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import Typography from "@mui/material/Typography";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import AccountWrapper from "./AccountWrapper";
import { TransactionType } from "@/types/transactions/transaction.d";
import { AccountBillingType } from "@/types/account/account-billing.d";

function AccountBilling({
  data,
  title,
  alignTitle,
  titleSize,
  currentPlan,
}: AccountBillingType) {
  const transactions = data as TransactionType[];

  if (!transactions || transactions.length === 0) {
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

          {/* Invoices to be developed !!! */}
          <TooltipArrow title="Available soon" placement="top">
            <i className="bi bi-cloud-download ml-4 text-base text-red-500"></i>
          </TooltipArrow>
        </div>

        {transactions.map((txn) => {
          const isActive = txn.stripeId === currentPlan;
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
    </AccountWrapper>
  );
}

export default memo(AccountBilling);
