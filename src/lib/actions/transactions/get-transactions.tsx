"use server";

import { gqlFetch } from "@/lib/api/graphql-fetcher";
import { TransactionType } from "@/types/transactions/transaction.d";

const GET_TRANSACTIONS_QUERY = `
  query GetTransactions {
    transactions {
      id
      userId
      amount
      status
      type
      createdAt
      plan
      expiresAt
    }
  }
`;

type TransactionsResponse = {
  transactions: TransactionType[];
};

type GetTransactionsResult =
  | { success: true; transactions: TransactionType[] }
  | { success: false; error: string; transactions: [] };

export async function getTransactions(): Promise<GetTransactionsResult> {
  try {
    const data = await gqlFetch<TransactionsResponse>(GET_TRANSACTIONS_QUERY, {});

    if (!data.transactions) {
      return {
        success: false,
        error: "No transactions data received",
        transactions: [],
      };
    }

    return {
      success: true,
      transactions: data.transactions,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch transactions",
      transactions: [],
    };
  }
}
