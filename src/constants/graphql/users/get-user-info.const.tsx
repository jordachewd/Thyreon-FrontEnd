import { gql } from "@apollo/client";

export const USER_INFO_QUERY = gql`
  query GetMe {
    me {
      id
      role
      email
      username
      clerkId
      clerkImg
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
