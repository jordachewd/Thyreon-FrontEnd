"use client";

import { USER_PLAN_QUERY } from "@/constants/graphql/users/get-user-plan.const";
import { TransactionType } from "@/types/transactions/transaction.d";
import { ErrorLike } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

type UserPlanQueryResp = {
  me: { currentPlan: TransactionType } | undefined;
};

type UserPlanReturn = {
  loading: boolean;
  error: ErrorLike | undefined;
  currentPlan: TransactionType;
};

export function useUserPlan(): UserPlanReturn {
  const { data, loading, error } = useQuery<UserPlanQueryResp>(USER_PLAN_QUERY);
  const currentPlan = data?.me?.currentPlan ?? ({} as TransactionType);

  return {
    currentPlan,
    loading,
    error,
  };
}
