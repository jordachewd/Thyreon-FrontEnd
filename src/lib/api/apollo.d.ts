import "@apollo/client";

declare module "@apollo/client" {
  // Declaring DeclareDefaultOptions switches hooks to "modern" signatures,
  // which forbid manually specified generics (useQuery<TData>). Keep the
  // "classic" signatures until call sites migrate to TypedDocumentNode.
  export interface TypeOverrides {
    signatureStyle: "classic";
  }

  namespace ApolloClient {
    namespace DeclareDefaultOptions {
      // Affects client.watchQuery() and React hooks (useQuery, useSuspenseQuery, etc.)
      interface WatchQuery {
        errorPolicy: "all";
      }
      // Affects client.query()
      interface Query {
        errorPolicy: "all";
      }
      // Affects client.mutate()
      interface Mutate {
        errorPolicy: "all";
      }
    }
  }
}
