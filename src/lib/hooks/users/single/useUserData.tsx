"use client";

import { GET_ME_QUERY } from "@/constants/graphql/users/get-me.const";
import { GET_USER_BY_ID } from "@/constants/graphql/users/get-user-by-id.const";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { TransactionType } from "@/types/transactions/transaction.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import { GetUserInfo } from "@/types/users/get-user-info.d";

import { ApolloError, ApolloQueryResult, useQuery } from "@apollo/client";
import { useMemo } from "react";

type MeResp = { me: GetUserData | undefined };
type ByIdResp = { userById: GetUserData | undefined };

type UsersDataReturn = {
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => Promise<ApolloQueryResult<MeResp | ByIdResp>>;
  userPlan: TransactionType;
  userTransactions: TransactionType[];
  userSites: GetSiteData[];
  userInfo: GetUserInfo;
};

export function useUserData(opts?: { userId?: number }): UsersDataReturn {
  const idType =
    typeof opts?.userId === "number" && Number.isFinite(opts.userId);
  const userId = idType ? opts.userId : undefined;

  const meQ = useQuery<MeResp>(GET_ME_QUERY, {
    skip: !!userId,
  });

  const byIdQ = useQuery<ByIdResp>(GET_USER_BY_ID, {
    variables: userId ? { id: Number(userId) } : undefined,
    skip: !userId,
  });

  const loading = userId ? byIdQ.loading : meQ.loading;
  const error = userId ? byIdQ.error : meQ.error;

  const refetch = () => {
    return userId ? byIdQ.refetch() : meQ.refetch();
  };

  const userByIdData = byIdQ.data?.userById ?? undefined;
  const meData = meQ.data?.me ?? undefined;

  const userData = useMemo(
    () => (userId ? userByIdData : meData),
    [userId, userByIdData, meData]
  );

  const userInfo: GetUserInfo = useMemo(
    () =>
      userData
        ? (() => {
            const { transactions, sites, ...rest } = userData;
            void transactions;
            void sites;
            return rest;
          })()
        : ({} as GetUserInfo),
    [userData]
  );

  const userPlan = userData?.currentPlan ?? ({} as TransactionType);
  const userTransactions = userData?.transactions ?? ([] as TransactionType[]);
  const userSites = userData?.sites ?? ([] as GetSiteData[]);

  return {
    loading,
    error,
    refetch,
    userPlan,
    userTransactions,
    userSites,
    userInfo,
  };
}
