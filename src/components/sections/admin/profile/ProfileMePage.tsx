"use client";

import ProfileBilling from "@/components/sections/admin/profile/ProfileBilling";
import ProfileHero from "@/components/sections/admin/profile/ProfileHero";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { useAdminContext } from "@/context/admin/AdminContext";
import { Transaction } from "@/types/transactions/transaction.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import { useMemo } from "react";

export default function ProfileMePage() {
  const { meCtx } = useAdminContext();
  const { data, loading, error } = meCtx;

  const profile = data?.me as GetUserData;
  const currentPlan = profile?.currentPlan?.stripeId as string;

  const transactions: Transaction[] = useMemo(
    () => profile?.transactions || [],
    [profile]
  );

  if (loading) return <LoadingBubbles wrapped />;
  if (error) return <ErrorCard error={error.message} title="" />;

  return (
    <>
      <ProfileHero title="Profile Overview" alignTitle="left" data={profile} />
      <ProfileBilling
        title="Transaction History"
        alignTitle="left"
        data={transactions}
        currentPlan={currentPlan}
      />
    </>
  );
}
