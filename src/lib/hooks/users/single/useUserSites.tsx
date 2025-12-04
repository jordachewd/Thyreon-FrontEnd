"use client";

import { USER_SITES_QUERY } from "@/constants/graphql/users/get-user-sites.const";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { ErrorLike } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

type UserSitesQueryResp = {
  me: { sites: GetSiteData[] } | undefined;
};

type UserSitesReturn = {
  loading: boolean;
  error: ErrorLike | undefined;
  sites: GetSiteData[];
};

export function useUserSites(): UserSitesReturn {
  const { data, loading, error } =
    useQuery<UserSitesQueryResp>(USER_SITES_QUERY);
  const sites = data?.me?.sites ?? ([] as GetSiteData[]);

  return {
    loading,
    error,
    sites,
  };
}
