import { gql } from "@apollo/client";

export const GET_MY_SITES_QUERY = gql`
  query GetMySites {
    meSites {
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
