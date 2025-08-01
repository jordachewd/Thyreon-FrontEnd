"use client";

import { useQuery } from "@apollo/client";
import { GetUserData } from "@/types/users/get-user-data.d";
import { GET_USER_BY_ID } from "@/constants/graphql/users/get-user-by-id.const";
import { useUpdatedUserSocket } from "@/lib/hooks/sockets/useUpdatedUserSocket";
import PageHead from "@/components/layout/common/PageHead";
import EditUserDialog from "../dialogs/EditUserDialog";
import ProfileBilling from "../../profile/ProfileBilling";
import ProfileHero from "../../profile/ProfileHero";

interface EditUserProps {
  userId: number;
}

export default function EditUserProfile({ userId }: EditUserProps) {
  const { data, loading, error, refetch } = useQuery<{ userById: GetUserData }>(
    GET_USER_BY_ID,
    {
      variables: { id: Number(userId) },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  const profileData = { profile: data?.userById as GetUserData };

  useUpdatedUserSocket(() => {
    refetch();
  });

  return (
    <>
      <PageHead title="User Details" alignTitle="left">
        <EditUserDialog data={profileData} />
      </PageHead>

      <ProfileHero data={profileData} loading={loading} error={error} />

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
