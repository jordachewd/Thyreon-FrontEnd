"use client";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { ReactNode, useMemo } from "react";

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:4000/graphql";

export default function ClientApolloProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: GRAPHQL_API_URL,
    });

    const authLink = setContext(async (_, { headers }) => {
      // Get token from Clerk on client side
      const token = await fetch("/api/auth/token").then(res => res.json()).then(data => data.token).catch(() => null);
      
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
