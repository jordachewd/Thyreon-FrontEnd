"use client";

import { GRAPHQL_API_URL } from "@/constants/api/graphql-api-url.const";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useMemo, useRef } from "react";
import { NODE_ENV } from "@/constants/api/node-env.const";

export function useApolloClient() {
  const { getToken } = useAuth();

  const getTokenRef = useRef(getToken);
  useEffect(() => {
    getTokenRef.current = getToken;
  }, [getToken]);

  const apolloClient = useMemo(() => {
    const httpLink = new HttpLink({
      uri: GRAPHQL_API_URL,
    });

    const authLink = setContext(async (_, { headers }) => {
      const token = await getTokenRef.current?.();
      return {
        headers: {
          ...headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          if (NODE_ENV !== "production") {
            console.warn("[GraphQL error]", err);
          }
        }
      }
      if (networkError && NODE_ENV !== "production") {
        console.warn("[Network error]", networkError);
      }
    });

    return new ApolloClient({
      link: from([errorLink, authLink, httpLink]),
      cache: new InMemoryCache(),
      queryDeduplication: true,
      connectToDevTools: NODE_ENV !== "production",
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "cache-and-network",
          errorPolicy: "all",
        },
        query: {
          fetchPolicy: "cache-first",
          errorPolicy: "all",
        },
        mutate: {
          errorPolicy: "all",
        },
      },
    });
  }, []);

  return apolloClient;
}
