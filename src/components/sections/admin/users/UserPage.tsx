"use client";

import PageHead from "@/components/layout/common/PageHead";
import { useUpdatedUserSocket } from "@/lib/hooks/sockets/useUpdatedUserSocket";
import { useUserData } from "@/lib/hooks/users/single/useUserData";
import { useCallback } from "react";
import AccountBilling from "../../app/account/AccountBilling";
import AccountHero from "../../app/account/AccountHero";
import AccountSites from "../../app/account/AccountSites";
import EditUserDialog from "./dialogs/EditUserDialog";

export default function UserPage({ userId }: { userId: number }) {
  const { loading, error, refetch, userTransactions, userSites, userInfo } =
    useUserData({ userId });

  const userPlanId = userInfo?.currentPlan?.stripeId || "";

  const handleRefetch = useCallback(() => refetch(), [refetch]);
  useUpdatedUserSocket(handleRefetch);

  return (
    <>
      <PageHead title="User Details" alignTitle="left">
        <EditUserDialog data={userInfo} />
      </PageHead>

      <AccountHero userInfo={userInfo} loading={loading} error={error} />

      <AccountBilling
        title="Transactions"
        titleSize="h6"
        alignTitle="left"
        transactions={userTransactions}
        userPlanId={userPlanId}
        loading={loading}
        error={error}
      />

      <AccountSites
        title="Sites"
        titleSize="h6"
        alignTitle="left"
        sites={userSites}
        loading={loading}
        error={error}
      />
    </>
  );
}
