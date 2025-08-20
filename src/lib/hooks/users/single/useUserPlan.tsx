"use client";

import { USER_PLAN_QUERY } from "@/constants/graphql/users/get-user-plan.const";
import { TransactionType } from "@/types/transactions/transaction.d";
import { ApolloError, useQuery } from "@apollo/client";

type UserPlanQueryResp = {
  me: { currentPlan: TransactionType } | undefined;
};

type UserPlanReturn = {
  loading: boolean;
  error: ApolloError | undefined;
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
