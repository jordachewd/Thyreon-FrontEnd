"use server";

import { gqlFetch } from "@/lib/api/graphql-fetcher";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { TransactionType } from "@/types/transactions/transaction.d";
import { GetUserInfo } from "@/types/users/get-user-info.d";

const GET_ME_QUERY = `
  query GetMe {
    me {
      id
      clerkId
      email
      role
      username
      firstName
      lastName
      createdAt
      updatedAt
      currentPlan {
        id
        userId
        stripeId
        amount
        plan
        billing
        createdAt
        updatedAt
      }
      transactions {
        id
        userId
        stripeId
        amount
        plan
        billing
        createdAt
        updatedAt
      }
      sites {
        id
        userId
        domain
        siteName
        status
        apiKey
        createdAt
      }
    }
  }
`;

type UserDataResult = {
  success: boolean;
  userInfo: GetUserInfo;
  userTransactions: TransactionType[];
  userSites: GetSiteData[];
  error?: string;
};

export default async function getUserData(): Promise<UserDataResult> {
  try {
    const data = await gqlFetch<{ me: GetUserInfo & { transactions: TransactionType[]; sites: GetSiteData[] } }>(
      GET_ME_QUERY
    );

    if (!data?.me) {
      return {
        success: false,
        userInfo: {} as GetUserInfo,
        userTransactions: [],
        userSites: [],
        error: "User data not found",
      };
    }

    const { transactions, sites, ...userInfo } = data.me;

    return {
      success: true,
      userInfo,
      userTransactions: transactions || [],
      userSites: sites || [],
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      success: false,
      userInfo: {} as GetUserInfo,
      userTransactions: [],
      userSites: [],
      error: error instanceof Error ? error.message : "Failed to fetch user data",
    };
  }
}
