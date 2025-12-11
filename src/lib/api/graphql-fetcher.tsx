import { GRAPHQL_API_URL } from "@/constants/api/graphql-api-url.const";
import { getClerkAuthHeaders } from "./get-clerk-auth-headers";

type GqlFetchResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function gqlFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  try {
    const headers = await getClerkAuthHeaders();
    const response = await fetch(GRAPHQL_API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GqlFetchResponse<T> = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0]?.message || "GraphQL fetch failed");
    }

    if (!result.data) {
      throw new Error("GraphQL response missing data property.");
    }

    return result.data;
  } catch (error) {
    throw error;
  }
}
