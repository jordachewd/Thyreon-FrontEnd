"use client";

import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { RefetchQueryType } from "@/types/common/refetch-query.d";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { ErrorLike } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";

type SitesQueryResp = { sites: GetSiteData[] | undefined };
type MeSitesQueryResp = { meSites: GetSiteData[] | undefined };

type SitesTableDataReturn = {
  loading: boolean;
  error: ErrorLike | undefined;
  refetch: () => Promise<unknown>;
  refetchQuery: RefetchQueryType;
  sites: GetSiteData[];
};

export function useSitesData(opts?: {
  isAdminPage?: boolean;
}): SitesTableDataReturn {
  const isAdmin = !!opts?.isAdminPage;

  const meSitesQ = useQuery<MeSitesQueryResp>(GET_MY_SITES_QUERY, {
    skip: isAdmin,
  });

  const sitesQ = useQuery<SitesQueryResp>(GET_SITES_QUERY, {
    skip: !isAdmin,
  });

  const active = isAdmin ? sitesQ : meSitesQ;

  const refetch = async () => {
    return active.refetch();
  };

  const allSites = sitesQ.data?.sites ?? ([] as GetSiteData[]);
  const userSites = meSitesQ.data?.meSites ?? ([] as GetSiteData[]);

  const refetchQuery = [
    isAdmin ? GET_SITES_QUERY : GET_MY_SITES_QUERY,
    isAdmin ? "GetAllSites" : "GetMySites",
  ] as RefetchQueryType;

  const sites = useMemo(
    () => (isAdmin ? allSites : userSites),
    [isAdmin, allSites, userSites]
  );

  return {
    loading: active.loading,
    error: active.error,
    refetch,
    refetchQuery,
    sites,
  };
}
