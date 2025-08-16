import { gql } from "@apollo/client";

export const USER_ROLE_QUERY = gql`
  query GetMe {
    me {
      id
      role
    }
  }
`;
