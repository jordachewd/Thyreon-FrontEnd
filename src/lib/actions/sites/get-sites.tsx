"use server";

import { gqlFetch } from "@/lib/api/graphql-fetcher";
import { GetSiteData } from "@/types/sites/get-site-data.d";

const GET_SITES_QUERY = `
  query GetSites {
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
`;

const GET_MY_SITES_QUERY = `
  query GetMySites {
    meSites {
      id
      userId
      domain
      siteName
      status
      apiKey
      createdAt
    }
  }
`;

type SitesResponse = {
  sites: GetSiteData[];
};

type MeSitesResponse = {
  meSites: GetSiteData[];
};

type GetSitesResult =
  | { success: true; sites: GetSiteData[] }
  | { success: false; error: string; sites: [] };

export async function getAllSites(): Promise<GetSitesResult> {
  try {
    const data = await gqlFetch<SitesResponse>(GET_SITES_QUERY, {});

    if (!data.sites) {
      return {
        success: false,
        error: "Sites data not found in response",
        sites: [],
      };
    }

    return {
      success: true,
      sites: data.sites,
    };
  } catch (error) {
    const defaultErrMsg = "Failed to fetch sites.";
    const errMsg = error instanceof Error ? error.message : defaultErrMsg;

    return {
      success: false,
      error: errMsg,
      sites: [],
    };
  }
}

export async function getMySites(): Promise<GetSitesResult> {
  try {
    const data = await gqlFetch<MeSitesResponse>(GET_MY_SITES_QUERY, {});

    if (!data.meSites) {
      return {
        success: false,
        error: "Sites data not found in response",
        sites: [],
      };
    }

    return {
      success: true,
      sites: data.meSites,
    };
  } catch (error) {
    const defaultErrMsg = "Failed to fetch your sites.";
    const errMsg = error instanceof Error ? error.message : defaultErrMsg;

    return {
      success: false,
      error: errMsg,
      sites: [],
    };
  }
}

