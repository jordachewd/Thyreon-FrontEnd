"use client";

import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { GetUserData } from "@/types/users/get-user-data.d";
import { GET_USER_BY_ID } from "@/constants/graphql/users/get-user-by-id.const";
import { useUpdatedUserSocket } from "@/lib/hooks/sockets/useUpdatedUserSocket";
import PageHead from "@/components/layout/common/PageHead";
import EditUserDialog from "./dialogs/EditUserDialog";
import ProfileBilling from "../profile/ProfileBilling";
import ProfileHero from "../profile/ProfileHero";
import { Typography } from "@mui/material";

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
  const handleRefetch = useCallback(() => refetch(), [refetch]);

  useUpdatedUserSocket(handleRefetch);

  return (
    <>
      <PageHead title="User Details" alignTitle="left">
        <EditUserDialog data={profileData} />
      </PageHead>

      <ProfileHero data={profileData} loading={loading} error={error} />

      <Typography variant="h6" color="error">
        User Sites List Here
      </Typography>

      <ProfileBilling
        title="Transactions"
        titleSize="h5"
        alignTitle="left"
        data={profileData}
        loading={loading}
        error={error}
      />
    </>
  );
}
