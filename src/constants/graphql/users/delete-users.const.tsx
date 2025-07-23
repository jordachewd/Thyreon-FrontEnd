import { gql } from "@apollo/client";

export const DELETE_USERS = gql`
  mutation DeleteUsers($clerkIds: [String!]!) {
    deleteUsers(clerkIds: $clerkIds) {
      status
      message
    }
  }
`;
