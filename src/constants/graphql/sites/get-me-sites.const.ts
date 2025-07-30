import { gql } from "@apollo/client";

export const GET_MY_SITES_QUERY = gql`
  query GetMySites {
    meSites {
      id
      siteName
      domain
      apiKey
      createdAt
      lastSeen
    }
  }
`;
