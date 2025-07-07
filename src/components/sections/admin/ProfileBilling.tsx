import css from "@/styles/sections/admin/ProfileBilling.module.css";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { Typography } from "@mui/material";
import { Transaction } from "@/types/transactions/transaction.d";
import { TooltipArrow } from "../../shared/TooltipArrow";
import { getRandomString } from "@/lib/utils/getRandomString";
import PageHead from "../../shared/PageHead";

interface BillingProps {
  stripeId: string | null;
  userTxns: Transaction[] | null;
}

export default function ProfileBilling({ stripeId, userTxns }: BillingProps) {
  return (
    <section className={css.section}>
      <PageHead
        title="Billing History"
        subtitle="View your billing history and manage your subscriptions."
      />

      {userTxns && userTxns.length > 0 ? (
        <div className={css.table}>
          <div className={css.tableHead}>
            <p className="flex-1">Plan</p>
            <p className="flex-1 text-center">Amount</p>
            <p className="hidden md:flex flex-1 text-center">Purchased</p>
            <p className="hidden md:flex flex-1 text-center">Expires</p>
            <p className="min-w-14 text-center">Status</p>
            <i className="bi bi-cloud-download ml-4 text-base"></i>
          </div>

          {userTxns.map((txn) => {
            const payCycle = txn.billing === "Monthly" ? "Mo" : "Yr";
            const txnStatus = txn.stripeId === stripeId ? "Active" : "Inactive";
            const txnColor =
              txn.stripeId === stripeId ? css.active : css.inactive;
            return (
              <div key={txn.id + getRandomString(32)} className={css.tableRow}>
                <p className="flex-1 font-medium">{txn.plan}</p>
                <p className="flex-1 font-medium text-center">
                  €{txn.amount}
                  <span className="text-xxs font-normal"> / {payCycle}</span>
                </p>
                <p className="hidden md:flex flex-1 text-xxs text-center">
                  {getFormattedDate(txn.createdAt)}
                </p>
                <p className="hidden md:flex flex-1 text-xxs text-center">
                  {getFormattedDate(txn.expiresOn)}
                </p>
                <p className="min-w-14 text-xxs text-center">
                  <span className={txnColor}>{txnStatus}</span>
                </p>

                <TooltipArrow title="Download Invoice" placement="top">
                  <i className="bi bi-file-earmark-arrow-down ml-4 text-base cursor-pointer"></i>
                </TooltipArrow>
              </div>
            );
          })}
        </div>
      ) : (
        <Typography
          variant="body2"
          className="text-center !mt-10 !text-slate-600"
        >
          No transactions yet.
        </Typography>
      )}
    </section>
  );
}
