"use client";

import { useQuery } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { GetUserData } from "@/types/users/get-user-data.d";
import { GET_USER_BY_ID } from "@/constants/graphql/users/get-user-by-id.const";
import { useUpdatedUserSocket } from "@/lib/hooks/sockets/useUpdatedUserSocket";
import { Transaction } from "@/types/transactions/transaction.d";
import { SiteData } from "@/types/sites/site-data.d";
import PageHead from "@/components/layout/common/PageHead";
import EditUserDialog from "./dialogs/EditUserDialog";
import ProfileBilling from "../profile/ProfileBilling";
import ProfileHero from "../profile/ProfileHero";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ErrorCard from "@/components/shared/ErrorCard";
import ProfileSites from "../profile/ProfileSites";

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

  const sites: SiteData[] = useMemo(
    () => profileData?.sites || [],
    [profileData]
  );

  const transactions: Transaction[] = useMemo(
    () => profileData?.transactions || [],
    [profileData]
  );

  const handleRefetch = useCallback(() => refetch(), [refetch]);
  useUpdatedUserSocket(handleRefetch);

  if (loading) return <LoadingBubbles wrapped />;
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
      <PageHead title="User Info" alignTitle="left">
        <EditUserDialog data={profileData} />
      </PageHead>

      <ProfileHero data={profileData} />

      <ProfileBilling
        title="Transactions"
        titleSize="h6"
        alignTitle="left"
        data={transactions}
        currentPlan={currentPlan}
      />

      <ProfileSites
        title="Sites"
        titleSize="h6"
        alignTitle="left"
        data={sites}
      />
    </>
  );
}
