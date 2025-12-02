"use client";

import { GET_TRANSACTIONS_QUERY } from "@/constants/graphql/transactions/get-transactions.const";
import { TransactionType } from "@/types/transactions/transaction.d";
import { ErrorLike } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

type TsxQueryResp = {
  transactions: TransactionType[] | undefined;
};

type TsxTableDataReturn = {
  loading: boolean;
  error: ErrorLike | undefined;
  transactions: TransactionType[];
};

export default function useTransactionsTable(): TsxTableDataReturn {
  const { data, loading, error } = useQuery<TsxQueryResp>(
    GET_TRANSACTIONS_QUERY
  );

  const transactions = data?.transactions ?? ([] as TransactionType[]);

  return {
    loading,
    error,
    transactions,
  };
}
