"use client";

import { gql, useQuery } from "@apollo/client";
import ProfileHero from "../../profile/ProfileHero";
import { GetUserData } from "@/types/users/get-user-data.d";
import ProfileBilling from "../../profile/ProfileBilling";
import { useAdminContext } from "@/context/admin/AdminContext";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ErrorCard from "@/components/shared/ErrorCard";

const GET_USER_BY_ID = gql`
  query GetUserById($id: Int!) {
    userById(id: $id) {
      id
      role
      clerkImg
      firstName
      lastName
      username
      createdAt
      updatedAt
      currentPlan {
        billing
        stripeId
        expiresAt
      }
      transactions {
        plan
        amount
        billing
        stripeId
        createdAt
        expiresAt
      }
    }
  }
`;

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
