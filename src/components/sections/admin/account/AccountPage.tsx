"use client";

import { useUserData } from "@/lib/hooks/users/single/useUserData";
import AccountBilling from "./AccountBilling";
import AccountHero from "./AccountHero";
import AccountSites from "./AccountSites";

export default function AccountPage() {
  const { loading, error, userTransactions, userSites, userInfo } =
    useUserData();

  const userPlanId = userInfo?.currentPlan?.stripeId || "";

  return (
    <>
      <AccountHero
        title="Account Overview"
        userInfo={userInfo}
        loading={loading}
        error={error}
      />
      <AccountBilling
        title="Transaction History"
        transactions={userTransactions}
        userPlanId={userPlanId}
        loading={loading}
        error={error}
      />
      <AccountSites
        title="Registered Websites"
        sites={userSites}
        loading={loading}
        error={error}
      />
    </>
  );
}
