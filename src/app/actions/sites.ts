"use server";

import { gqlFetch } from "@/lib/graphql/server-fetch";
import { revalidatePath } from "next/cache";
import { GetUserData } from "@/types/users/get-user-data.d";

type SiteStatus = "active" | "inactive" | "revoked";

// Types
interface Site {
  id: number;
  siteName: string;
  domain: string;
  status: SiteStatus;
  createdAt: string;
  lastSeen: string;
  user?: GetUserData;
}

interface SiteMutationResponse {
  status: "success" | "error" | "warning" | "info";
  message: string;
  site?: {
    apiKey?: string;
    domain?: string;
    siteName?: string;
  };
}

// Queries
export async function getAllSites(): Promise<{ sites: Site[] }> {
  const query = `
    query GetAllSites {
      sites {
        id
        siteName
        domain
        status
        createdAt
        lastSeen
        user {
          id
          clerkImg
          username
          firstName
          lastName
          email
          clerkId
          role
        }
      }
    }
  `;

  return gqlFetch<{ sites: Site[] }>(query);
}

export async function getSiteById(id: number): Promise<{ siteById: Site }> {
  const query = `
    query GetSiteById($id: Int!) {
      siteById(id: $id) {
        id
        siteName
        domain
        status
        createdAt
        lastSeen
        user {
          id
          clerkImg
          username
          firstName
          lastName
          email
          clerkId
          role
        }
      }
    }
  `;

  return gqlFetch<{ siteById: Site }>(query, { id });
}

// Mutations
export async function createSite(input: {
  domain: string;
  siteName?: string;
}): Promise<SiteMutationResponse> {
  const mutation = `
    mutation CreateSite($input: GqlCreateSiteInput!) {
      createSite(input: $input) {
        status
        message
        site {
          apiKey
        }
      }
    }
  `;

  const result = await gqlFetch<{ createSite: SiteMutationResponse }>(
    mutation,
    { input }
  );

  revalidatePath("/sites");
  revalidatePath("/dashboard");

  return result.createSite;
}

export async function updateSite(
  id: number,
  input: { siteName?: string; domain?: string }
): Promise<SiteMutationResponse> {
  const mutation = `
    mutation UpdateSite($id: Int!, $input: GqlUpdateSiteInput!) {
      updateSite(id: $id, input: $input) {
        status
        message
        site {
          domain
          siteName
          apiKey
        }
      }
    }
  `;

  const result = await gqlFetch<{ updateSite: SiteMutationResponse }>(
    mutation,
    { id, input }
  );

  revalidatePath("/sites");
  revalidatePath(`/sites/${id}`);

  return result.updateSite;
}

export async function deleteSites(
  ids: number[]
): Promise<SiteMutationResponse> {
  const mutation = `
    mutation DeleteSites($ids: [Int!]!) {
      deleteSites(ids: $ids) {
        status
        message
      }
    }
  `;

  const result = await gqlFetch<{ deleteSites: SiteMutationResponse }>(
    mutation,
    { ids }
  );

  revalidatePath("/sites");
  revalidatePath("/dashboard");

  return result.deleteSites;
}

export async function regenerateApiKey(
  id: number
): Promise<SiteMutationResponse> {
  const mutation = `
    mutation RegenerateApiKey($id: Int!) {
      regenerateApiKey(id: $id) {
        status
        message
        site {
          apiKey
        }
      }
    }
  `;

  const result = await gqlFetch<{ regenerateApiKey: SiteMutationResponse }>(
    mutation,
    { id }
  );

  revalidatePath(`/sites/${id}`);

  return result.regenerateApiKey;
}
