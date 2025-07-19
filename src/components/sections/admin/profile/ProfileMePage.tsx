"use client";

import ProfileBilling from "@/components/sections/admin/profile/ProfileBilling";
import ProfileHero from "@/components/sections/admin/profile/ProfileHero";
import { useAdminContext } from "@/context/admin/AdminContext";
import { GetUserData } from "@/types/users/get-user-data.d";

export default function ProfileMePage() {
  const { meCtx } = useAdminContext();
  const { data, loading, error } = meCtx;
  const profileData = { profile: data?.me as GetUserData | undefined };
  const isAdmin = data?.me?.role === "admin";

  return (
    <>
      <ProfileHero
        title="Profile Overview"
        data={profileData}
        loading={loading}
        error={error}
        isAdmin={isAdmin}
      />
      <ProfileBilling
        title="Transaction History"
        data={profileData}
        loading={loading}
        error={error}
      />
    </>
  );
}
