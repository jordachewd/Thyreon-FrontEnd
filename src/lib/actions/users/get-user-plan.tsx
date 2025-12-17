"use server";

import { gqlFetch } from "@/lib/api/graphql-fetcher";
import { TransactionType } from "@/types/transactions/transaction.d";

const USER_PLAN_QUERY = `
  query GetUserPlan {
    me {
      currentPlan {
        id
        userId
        stripeId
        amount
        status
        billing
        createdAt
        updatedAt
      }
    }
  }
`;

type UserPlanResult = {
  success: boolean;
  currentPlan: TransactionType;
  error?: string;
};

export default async function getUserPlan(): Promise<UserPlanResult> {
  try {
    const data = await gqlFetch<{ me: { currentPlan: TransactionType } }>(
      USER_PLAN_QUERY
    );

    if (!data?.me?.currentPlan) {
      return {
        success: true,
        currentPlan: {} as TransactionType,
      };
    }

    return {
      success: true,
      currentPlan: data.me.currentPlan,
    };
  } catch (error) {
    console.error("Error fetching user plan:", error);
    return {
      success: false,
      currentPlan: {} as TransactionType,
      error: error instanceof Error ? error.message : "Failed to fetch user plan",
    };
  }
}
