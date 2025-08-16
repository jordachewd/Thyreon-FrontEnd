import { gql } from "@apollo/client";

export const USER_SITES_QUERY = gql`
  query GetMe {
    me {
      id
      sites {
        id
        siteName
        domain
        createdAt
      }
    }
  }
`;
