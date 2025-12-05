"use client";

import { GRAPHQL_API_URL } from "@/constants/api/graphql-api-url.const";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  ApolloLink,
} from "@apollo/client";
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

    const authLink = new SetContextLink(async (prevContext) => {
      const token = await getTokenRef.current?.();

      return {
        headers: {
          ...prevContext.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };
    });

    const errorLink = new ErrorLink(({ error }) => {
      if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      } else if (CombinedProtocolErrors.is(error)) {
        error.errors.forEach(({ message, extensions }) =>
          console.log(
            `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
              extensions
            )}`
          )
        );
      } else {
        console.error(`[Network error]: ${error}`);
      }
    });

    return new ApolloClient({
      link: ApolloLink.from([errorLink, authLink, httpLink]),
      cache: new InMemoryCache(),
      queryDeduplication: true,
      devtools: { enabled: NODE_ENV !== "production" },
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
