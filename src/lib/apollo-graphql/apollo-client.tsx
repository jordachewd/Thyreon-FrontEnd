"use client";

import { GRAPHQL_API_URL } from "@/constants/api/graphql-api-url.const";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";

export function useApolloClient() {
  const { getToken } = useAuth();

  const apolloClient = useMemo(() => {
    const httpLink = new HttpLink({
      uri: GRAPHQL_API_URL,
    });

    const authLink = setContext(async (_, { headers }) => {
      const token = await getToken();

      console.warn("Apollo Client Token:", token);

      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [getToken]);

  return apolloClient;
}
