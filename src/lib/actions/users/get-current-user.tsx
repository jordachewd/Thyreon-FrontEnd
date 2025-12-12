"use server";

import { GET_CURRENT_USER_QUERY } from "@/constants/graphql/users/get-current-user.gql";
import { gqlFetch } from "@/lib/api/graphql-fetcher";
import { GetUserData } from "@/types/users/get-user-data.d";

type CurrentUserResponse = { me: GetUserData };

type GetCurrentUserResult =
  | { success: true; user: GetUserData }
  | { success: false; error: string; user: null };

export default async function getCurrentUser(): Promise<GetCurrentUserResult> {
  try {
    const data = await gqlFetch<CurrentUserResponse>(
      GET_CURRENT_USER_QUERY,
      {}
    );

    if (!data.me) {
      return {
        success: false,
        error: "User data not found in response",
        user: null,
      };
    }

    return {
      success: true,
      user: data.me,
    };
  } catch (error) {
    const defaultErrMsg = "Failed to fetch current user.";
    const errMsg = error instanceof Error ? error.message : defaultErrMsg;

    return {
      success: false,
      error: errMsg,
      user: null,
    };
  }
}
