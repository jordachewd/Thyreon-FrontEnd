import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query GetAllUsers {
    users {
      id
      role
      email
      username
      firstName
      lastName
      clerkId
      clerkImg
      createdAt
      currentPlan {
        id
        plan
        expiresAt
      }
    }
  }
`;
