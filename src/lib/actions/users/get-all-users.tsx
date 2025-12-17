"use server";

import { GET_ALL_USERS_QUERY } from "@/constants/graphql/users/get-all-users.gql";
import { gqlFetch } from "@/lib/api/graphql-fetcher";
import { GetUserData } from "@/types/users/get-user-data.d";

type AllUsersResponse = {
  users: GetUserData[];
};

type GetAllUsersResult =
  | { success: true; users: GetUserData[] }
  | { success: false; error: string; users: [] };

export default async function getAllUsers(): Promise<GetAllUsersResult> {
  try {
    const data = await gqlFetch<AllUsersResponse>(GET_ALL_USERS_QUERY, {});

    if (!data.users) {
      return {
        success: false,
        error: "Users data not found in response",
        users: [],
      };
    }

    return {
      success: true,
      users: data.users,
    };
  } catch (error) {
    const defaultErrMsg = "Failed to fetch users.";
    const errMsg = error instanceof Error ? error.message : defaultErrMsg;

    return {
      success: false,
      error: errMsg,
      users: [],
    };
  }
}
