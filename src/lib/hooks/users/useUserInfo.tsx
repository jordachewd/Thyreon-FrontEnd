"use client";

import { USER_INFO_QUERY } from "@/constants/graphql/users/get-user-info.const";
import { GetUserData } from "@/types/users/get-user-data.d";
import { useQuery } from "@apollo/client";

type GetUserInfoResponse = {
  me: GetUserData;
};

export function useUserInfo() {
  const { data, loading, error } = useQuery<GetUserInfoResponse>(
    USER_INFO_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  const userInfo: GetUserData | undefined = data?.me;

  return {
    userInfo,
    loading,
    error,
  };
}
