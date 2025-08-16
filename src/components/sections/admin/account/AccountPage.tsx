"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { TransactionType } from "@/types/transactions/transaction.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import AccountBilling from "./AccountBilling";
import AccountHero from "./AccountHero";
import AccountSites from "./AccountSites";
import { GET_ME_QUERY } from "@/constants/graphql/users/get-me.const";
import { useQuery } from "@apollo/client";

export default function AccountPage() {
  const { data, loading, error } = useQuery<{ me: GetUserData }>(GET_ME_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard error={error.message} title="" />;

  const account = data?.me as GetUserData;
  const currentPlan = account?.currentPlan?.stripeId as string;
  const transactions: TransactionType[] = account?.transactions || [];
  const sites: GetSiteData[] = account?.sites || [];

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
