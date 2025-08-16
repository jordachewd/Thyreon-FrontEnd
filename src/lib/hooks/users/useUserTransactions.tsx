"use client";

import { USER_TRANSACTIONS_QUERY } from "@/constants/graphql/users/get-user-transactions.const";
import { TransactionType } from "@/types/transactions/transaction.d";
import { useQuery } from "@apollo/client";

type GetUserTsxResponse = {
  me: { transactions: TransactionType[] | undefined } | null;
};

export function useUserTransactions() {
  const { data, loading, error } = useQuery<GetUserTsxResponse>(
    USER_TRANSACTIONS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  const transactions: TransactionType[] | undefined = data?.me?.transactions;

  return {
    transactions,
    loading,
    error,
  };
}
