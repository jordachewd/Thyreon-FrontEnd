import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserById($id: Int!) {
    userById(id: $id) {
      id
      role
      email
      clerkId
      clerkImg
      firstName
      lastName
      username
      createdAt
      updatedAt
      currentPlan {
        id
        billing
        stripeId
        expiresAt
      }
      transactions {
        id
        plan
        amount
        billing
        stripeId
        createdAt
        expiresAt
      }
    }
  }
`;
