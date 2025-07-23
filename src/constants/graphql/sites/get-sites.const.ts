import { gql } from "@apollo/client";

export const GET_SITES_QUERY = gql`
  query GetSites {
    sites {
      id
      siteName
      userId
      siteName
      domain
      apiKey
      createdAt
      lastSeen
    }
  }
`;
