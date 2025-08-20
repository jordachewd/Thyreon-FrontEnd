"use client";

import { useApolloClient } from "@/lib/api/apollo-client";
import { ApolloProvider } from "@apollo/client";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const apolloClient = useApolloClient();
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
