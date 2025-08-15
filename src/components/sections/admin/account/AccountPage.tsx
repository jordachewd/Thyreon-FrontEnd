"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { useAdminContext } from "@/context/admin/AdminContext";
import { SiteData } from "@/types/sites/site-data.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import { Transaction } from "@/types/transactions/transaction.d";
import AccountBilling from "./AccountBilling";
import AccountHero from "./AccountHero";
import AccountSites from "./AccountSites";

export default function AccountPage() {
  const { meCtx } = useAdminContext();
  const { data, loading, error } = meCtx;

  const account = data?.me as GetUserData;

  const currentPlan = account?.currentPlan?.stripeId as string;
  const transactions: Transaction[] = account?.transactions || [];

  const sites: SiteData[] = account?.sites || [];

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard error={error.message} title="" />;

  console.log("AccountPage data:", account);

  return (
    <>
      <AccountHero title="Account Overview" data={account} />
      <AccountBilling
        title="Transaction History"
        data={transactions}
        currentPlan={currentPlan}
      />
      <AccountSites title="Registered Websites" data={sites} />
    </>
  );
}
