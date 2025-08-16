"use client";

import { USER_PLAN_QUERY } from "@/constants/graphql/users/get-user-plan.const";
import { TransactionType } from "@/types/transactions/transaction.d";
import { useQuery } from "@apollo/client";

type GetUserPlanResponse = {
  me: { currentPlan: TransactionType } | null;
};

export function useUserPlan() {
  const { data, loading, error } = useQuery<GetUserPlanResponse>(
    USER_PLAN_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  const currentPlan: TransactionType | undefined = data?.me?.currentPlan;

  return {
    currentPlan,
    loading,
    error,
  };
}
