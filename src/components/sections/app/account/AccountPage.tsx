"use client";

import { memo } from "react";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { TransactionType } from "@/types/transactions/transaction.d";
import { GetUserInfo } from "@/types/users/get-user-info.d";
import { UserRole } from "@/types/users/user-role.d";
import AccountBilling from "./AccountBilling";
import AccountHero from "./AccountHero";
import AccountSites from "./AccountSites";

type AccountPageProps = {
  userInfo: GetUserInfo;
  userTransactions: TransactionType[];
  userSites: GetSiteData[];
  role: UserRole;
  error?: string;
};

function AccountPage({
  userInfo,
  userTransactions,
  userSites,
  role,
  error,
}: AccountPageProps) {
  const userPlanId = userInfo?.currentPlan?.stripeId || "";
  const loading = false;
  const errorObj = error ? { name: "Error", message: error } : undefined;

  return (
    <>
      <AccountHero
        title="Account Overview"
        userInfo={userInfo}
        role={role}
        loading={loading}
        error={errorObj}
      />

      <AccountBilling
        title="Transaction History"
        transactions={userTransactions}
        userPlanId={userPlanId}
        loading={loading}
        error={errorObj}
      />

      <AccountSites
        title="Registered Websites"
        sites={userSites}
        role={role}
        loading={loading}
        error={errorObj}
      />
    </>
  );
}

export default memo(AccountPage);
