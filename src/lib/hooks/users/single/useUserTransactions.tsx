"use client";

import { USER_TRANSACTIONS_QUERY } from "@/constants/graphql/users/get-user-transactions.const";
import { TransactionType } from "@/types/transactions/transaction.d";
import { ApolloError, useQuery } from "@apollo/client";

type UserTsxQueryResp = {
  me: { transactions: TransactionType[] } | undefined;
};

type UserTsxReturn = {
  loading: boolean;
  error: ApolloError | undefined;
  transactions: TransactionType[];
};

export function useUserTransactions(): UserTsxReturn {
  const { data, loading, error } = useQuery<UserTsxQueryResp>(
    USER_TRANSACTIONS_QUERY
  );

  const transactions = data?.me?.transactions ?? ([] as TransactionType[]);

  return {
    loading,
    error,
    transactions,
  };
}
