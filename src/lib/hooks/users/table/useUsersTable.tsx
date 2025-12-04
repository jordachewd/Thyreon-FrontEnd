"use client";

import { GET_USERS_QUERY } from "@/constants/graphql/users/get-users.const";
import { GetUserData } from "@/types/users/get-user-data.d";
import { ErrorLike } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

type UsersQueryResp = {
  users: GetUserData[] | undefined;
};

type UsersTableDataReturn = {
  loading: boolean;
  error: ErrorLike | undefined
  refetch: () => Promise<unknown>;
  users: GetUserData[];
};

export default function useUsersTable(): UsersTableDataReturn {
  const { data, loading, error, refetch } =
    useQuery<UsersQueryResp>(GET_USERS_QUERY);

  const users = data?.users ?? ([] as GetUserData[]);

  return {
    loading,
    error,
    refetch,
    users,
  };
}
