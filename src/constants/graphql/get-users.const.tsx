import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query GetAllUsers {
    users {
      id
      email
      username
      firstName
      lastName
      role
      clerkImg
      createdAt
    }
  }
`;
