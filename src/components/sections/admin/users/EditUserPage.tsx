"use client";

import { useQuery } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { GetUserData } from "@/types/users/get-user-data.d";
import { GET_USER_BY_ID } from "@/constants/graphql/users/get-user-by-id.const";
import { useUpdatedUserSocket } from "@/lib/hooks/sockets/useUpdatedUserSocket";
import { Transaction } from "@/types/transactions/transaction.d";
import { SiteData } from "@/types/site-data.d";
import PageHead from "@/components/layout/common/PageHead";
import EditUserDialog from "./dialogs/EditUserDialog";
import ProfileBilling from "../profile/ProfileBilling";
import ProfileHero from "../profile/ProfileHero";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ErrorCard from "@/components/shared/ErrorCard";
import ProfileSites from "../profile/ProfileSites";
import Typography from "@mui/material/Typography";

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
      <PageHead title="User Details" alignTitle="left">
        <EditUserDialog data={profileData} />
      </PageHead>

      <div className="flex w-full gap-8 !mt-4">
        <div className="flex flex-col w-1/6 bg-vanilla-200 gap-2">
          <Typography variant="h6" className="!mb-4">
            Navigation
          </Typography>
          <p>Notifications</p>
          <p>Security</p>
          <p>Upgrade Plan</p>
          <p>Settings</p>
        </div>
        <div className="flex flex-col flex-1">
          <ProfileHero data={profileData} />

          <ProfileBilling
            title="Transactions"
            titleSize="h5"
            alignTitle="left"
            data={transactions}
            currentPlan={currentPlan}
          />

          <ProfileSites
            title="Sites"
            titleSize="h5"
            alignTitle="left"
            data={sites}
          />
        </div>
      </div>
    </>
  );
}
