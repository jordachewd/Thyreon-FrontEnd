"use client";

import ProfileBilling from "@/components/sections/admin/profile/ProfileBilling";
import ProfileHero from "@/components/sections/admin/profile/ProfileHero";
import { useAdminContext } from "@/context/admin/AdminContext";
import { GetUserData } from "@/types/users/get-user-data.d";

export default function ProfileMePage() {
  const { meCtx } = useAdminContext();
  const { data, loading, error } = meCtx;

  const profileData = { profile: data?.me as GetUserData };

  return (
    <>
      <ProfileHero
        title="Profile Overview"
        data={profileData}
        loading={loading}
        error={error}
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
