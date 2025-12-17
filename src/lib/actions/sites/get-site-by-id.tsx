"use server";

import { gqlFetch } from "@/lib/api/graphql-fetcher";
import { GetSiteData } from "@/types/sites/get-site-data.d";

const GET_SITE_BY_ID_QUERY = `
  query GetSiteById($id: Int!) {
    siteById(id: $id) {
      id
      userId
      domain
      siteName
      status
      apiKey
      createdAt
      lastSeen
    }
  }
`;

type SiteByIdResponse = {
  siteById: GetSiteData;
};

export default async function getSiteById(
  id: number
): Promise<{ success: boolean; site?: GetSiteData; error?: string }> {
  try {
    const data = await gqlFetch<SiteByIdResponse>(GET_SITE_BY_ID_QUERY, { id });

    if (!data.siteById) {
      return {
        success: false,
        error: "Site not found",
      };
    }

    return {
      success: true,
      site: data.siteById,
    };
  } catch (error) {
    console.error("Error fetching site:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch site",
    };
  }
}
