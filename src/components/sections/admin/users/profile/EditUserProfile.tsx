"use client";

import { useQuery } from "@apollo/client";
import ProfileHero from "../../profile/ProfileHero";
import { GetUserData } from "@/types/users/get-user-data.d";
import ProfileBilling from "../../profile/ProfileBilling";
import { useAdminContext } from "@/context/admin/AdminContext";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ErrorCard from "@/components/shared/ErrorCard";
import { GET_USER_BY_ID } from "@/constants/graphql/users/get-user-by-id.const";
import PageHead from "@/components/layout/common/PageHead";
import EditUserDialog from "./EditUserDialog";

interface EditUserProps {
  userId: number;
}

export default function EditUserProfile({ userId }: EditUserProps) {
  const { meCtx } = useAdminContext();
  const { data: meData, loading: meLoading, error: meErr } = meCtx;

  const { data, loading, error } = useQuery<{ userById: GetUserData }>(
    GET_USER_BY_ID,
    {
      fetchPolicy: "network-only",
      variables: { id: Number(userId) },
    }
  );

  const profileData = { profile: data?.userById as GetUserData | undefined };
  const isAdmin = meData?.me?.role === "admin";

  if (meLoading) return <LoadingBubbles wrapped />;
  if (meErr) return <ErrorCard error={meErr.message} />;

  return (
    <>
      <PageHead title="User Details" alignTitle="left">
        <EditUserDialog data={profileData} />
      </PageHead>

      <ProfileHero
        data={profileData}
        loading={loading}
        error={error}
        isAdmin={isAdmin}
      />
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
