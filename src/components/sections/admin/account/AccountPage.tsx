"use client";

import AccountBilling from "@/components/sections/admin/account/AccountBilling";
import AccountHero from "@/components/sections/admin/account/AccountHero";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { useAdminContext } from "@/context/admin/AdminContext";
import { Transaction } from "@/types/transactions/transaction.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import { useMemo } from "react";

export default function AccountPage() {
  const { meCtx } = useAdminContext();
  const { data, loading, error } = meCtx;

  const account = data?.me as GetUserData;
  const currentPlan = account?.currentPlan?.stripeId as string;

  const transactions: Transaction[] = useMemo(
    () => account?.transactions || [],
    [account]
  );

  if (loading) return <LoadingBubbles wrapped fullHeight />;
  if (error) return <ErrorCard error={error.message} title="" />;

  return (
    <>
      <AccountHero title="Account Overview" alignTitle="left" data={account} />
      <AccountBilling
        title="Transaction History"
        alignTitle="left"
        data={transactions}
        currentPlan={currentPlan}
      />
    </>
  );
}
