"use client";

import PageHead from "@/components/layout/common/PageHead";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { GET_USER_BY_ID } from "@/constants/graphql/users/get-user-by-id.const";
import { useUpdatedUserSocket } from "@/lib/hooks/sockets/useUpdatedUserSocket";
import { SiteData } from "@/types/sites/site-data.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import { useQuery } from "@apollo/client";
import { Transaction } from "@/types/transactions/transaction.d";
import { useCallback } from "react";
import AccountBilling from "../account/AccountBilling";
import AccountHero from "../account/AccountHero";
import AccountSites from "../account/AccountSites";
import EditUserDialog from "./dialogs/EditUserDialog";

interface EditUserProps {
  userId: number;
}

export default function EditUserPage({ userId }: EditUserProps) {
  const { data, loading, error, refetch } = useQuery<{ userById: GetUserData }>(
    GET_USER_BY_ID,
    {
      variables: { id: Number(userId) },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  const profileData = data?.userById as GetUserData;
  const currentPlan = profileData?.currentPlan?.stripeId as string;

  const transactions: Transaction[] = profileData?.transactions || [];
  const sites: SiteData[] = profileData?.sites || [];

  const handleRefetch = useCallback(() => refetch(), [refetch]);
  useUpdatedUserSocket(handleRefetch);

  if (loading) return <LoadingBubbles />;
  if (error)
    return (
      <ErrorCard
        error={error.message}
        title="Fetching data error!"
        backToUrl="users"
      />
    );

  return (
    <>
      <PageHead title="User Details" alignTitle="left">
        <EditUserDialog data={profileData} />
      </PageHead>

      <AccountHero data={profileData} />

      <AccountBilling
        title="Transactions"
        titleSize="h6"
        alignTitle="left"
        data={transactions}
        currentPlan={currentPlan}
      />

      <AccountSites
        title="Sites"
        titleSize="h6"
        alignTitle="left"
        data={sites}
      />
    </>
  );
}
