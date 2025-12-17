"use client";

import { memo, Suspense } from "react";
import dynamic from "next/dynamic";
import PageHead from "@/components/layout/common/PageHead";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { TransactionType } from "@/types/transactions/transaction.d";
import { GetUserInfo } from "@/types/users/get-user-info.d";
import { UserRole } from "@/types/users/user-role.d";
import AccountBilling from "../../app/account/AccountBilling";
import AccountHero from "../../app/account/AccountHero";
import AccountSites from "../../app/account/AccountSites";

const EditUserDialog = dynamic(
  () => import("./dialogs/EditUserDialog"),
  { ssr: false }
);

type UserPageProps = {
  userInfo: GetUserInfo;
  userTransactions: TransactionType[];
  userSites: GetSiteData[];
  role: UserRole;
  error?: string;
};

function UserPage({
  userInfo,
  userTransactions,
  userSites,
  role,
  error,
}: UserPageProps) {
  const userPlanId = userInfo?.currentPlan?.stripeId || "";
  const loading = false;
  const errorObj = error ? { name: "Error", message: error } : undefined;

  return (
    <>
      <PageHead title="User Details" alignTitle="left">
        <Suspense fallback={null}>
          <EditUserDialog data={userInfo} />
        </Suspense>
      </PageHead>

      <AccountHero
        userInfo={userInfo}
        role={role}
        loading={loading}
        error={errorObj}
      />

      <AccountBilling
        title="Transactions"
        titleSize="h6"
        alignTitle="left"
        transactions={userTransactions}
        userPlanId={userPlanId}
        loading={loading}
        error={errorObj}
      />

      <AccountSites
        title="Sites"
        titleSize="h6"
        alignTitle="left"
        sites={userSites}
        role={role}
        loading={loading}
        error={errorObj}
      />
    </>
  );
}

export default memo(UserPage);
