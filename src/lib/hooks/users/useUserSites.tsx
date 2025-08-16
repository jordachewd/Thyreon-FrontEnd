"use client";

import { USER_SITES_QUERY } from "@/constants/graphql/users/get-user-sites.const";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useQuery } from "@apollo/client";

type GetUserSitesResponse = {
  me: { sites: GetSiteData[] } | null;
};

export function useUserSites() {
  const { data, loading, error } = useQuery<GetUserSitesResponse>(
    USER_SITES_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  const sites: GetSiteData[] | undefined = data?.me?.sites;

  return {
    sites,
    loading,
    error,
  };
}
