"use client";

import { USER_INFO_QUERY } from "@/constants/graphql/users/get-user-info.const";
import { GetUserData } from "@/types/users/get-user-data.d";
import { GetUserInfo } from "@/types/users/get-user-info.d";
import { ApolloError, useQuery } from "@apollo/client";

type UserInfoQueryResp = {
  me: GetUserData | undefined;
};

type UserInfoReturn = {
  loading: boolean;
  error: ApolloError | undefined;
  userInfo: GetUserInfo;
};

export function useUserInfo(): UserInfoReturn {
  const { data, loading, error } = useQuery<UserInfoQueryResp>(USER_INFO_QUERY);
  const userInfo = data?.me ?? ({} as GetUserInfo);

  return {
    userInfo,
    loading,
    error,
  };
}
