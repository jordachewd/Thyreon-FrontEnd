"use server";

import { gqlFetch } from "@/lib/api/graphql-fetcher";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { TransactionType } from "@/types/transactions/transaction.d";
import { GetUserInfo } from "@/types/users/get-user-info.d";

const GET_USER_BY_ID_QUERY = `
  query GetUserById($id: Int!) {
    userById(id: $id) {
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

type UserByIdResult = {
  success: boolean;
  userInfo: GetUserInfo;
  userTransactions: TransactionType[];
  userSites: GetSiteData[];
  error?: string;
};

export default async function getUserById(userId: number): Promise<UserByIdResult> {
  try {
    const data = await gqlFetch<{ userById: GetUserInfo & { transactions: TransactionType[]; sites: GetSiteData[] } }>(
      GET_USER_BY_ID_QUERY,
      { id: userId }
    );

    if (!data?.userById) {
      return {
        success: false,
        userInfo: {} as GetUserInfo,
        userTransactions: [],
        userSites: [],
        error: "User not found",
      };
    }

    const { transactions, sites, ...userInfo } = data.userById;

    return {
      success: true,
      userInfo,
      userTransactions: transactions || [],
      userSites: sites || [],
    };
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return {
      success: false,
      userInfo: {} as GetUserInfo,
      userTransactions: [],
      userSites: [],
      error: error instanceof Error ? error.message : "Failed to fetch user data",
    };
  }
}
