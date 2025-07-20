"use client";

import { useQuery } from "@apollo/client";
import ProfileHero from "../../profile/ProfileHero";
import { GetUserData } from "@/types/users/get-user-data.d";
import ProfileBilling from "../../profile/ProfileBilling";
import { useAdminContext } from "@/context/admin/AdminContext";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ErrorCard from "@/components/shared/ErrorCard";
import { GET_USER_BY_ID } from "@/constants/graphql/get-user-by-id.const";

interface EditUserProps {
  userId: number;
}

export default function EditUserProfile({ userId }: EditUserProps) {
  const { meCtx } = useAdminContext();
  const { data: meData, loading: meLoading, error: meErr } = meCtx;

  const { data, loading, error } = useQuery<{ userById: GetUserData }>(
    GET_USER_BY_ID,
    {
      variables: { id: Number(userId) },
    }
  );

  const profileData = { profile: data?.userById as GetUserData | undefined };
  const isAdmin = meData?.me?.role === "admin";

  if (meLoading) return <LoadingBubbles wrapped />;
  if (meErr) return <ErrorCard error={meErr.message} />;

  return (
    <>
      <ProfileHero
        title="Profile Overview"
        titleSize="h5"
        alignTitle="left"
        data={profileData}
        loading={loading}
        error={error}
        isAdmin={isAdmin}
      />
      <ProfileBilling
        title="Transaction History"
        titleSize="h5"
        alignTitle="left"
        data={profileData}
        loading={loading}
        error={error}
      />
    </>
  );
}
