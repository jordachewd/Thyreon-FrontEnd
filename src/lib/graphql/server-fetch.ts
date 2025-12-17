import { auth } from "@clerk/nextjs/server";

const GRAPHQL_API_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:3001/graphql";

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

/**
 * Server-side GraphQL fetch utility
 * Replaces Apollo Client for server components and server actions
 */
export async function gqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const { getToken } = await auth();
  const token = await getToken();

  const response = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: "no-store", // Disable caching for fresh data
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors) {
    throw new Error(
      result.errors.map((e) => e.message).join(", ") || "GraphQL error"
    );
  }

  if (!result.data) {
    throw new Error("No data returned from GraphQL");
  }

  return result.data;
}
