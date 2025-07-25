import { gql } from "@apollo/client";

export const GET_SITES_QUERY = gql`
  query GetAllSites {
    sites {
      id
      siteName
      user {
        id
        clerkId
        clerkImg
        username
        firstName
        lastName
        role
      }
      siteName
      domain
      apiKey
      createdAt
      lastSeen
    }
  }
`;
