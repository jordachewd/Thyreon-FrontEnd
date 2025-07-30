import { gql } from "@apollo/client";

export const GET_SITES_QUERY = gql`
  query GetAllSites {
    sites {
      id
      siteName
      domain
      apiKey
      createdAt
      lastSeen
      user {
        id
        clerkImg
        username
        firstName
        lastName
      }
    }
  }
`;
