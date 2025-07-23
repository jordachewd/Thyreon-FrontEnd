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
        billing
        stripeId
        expiresAt
      }
      transactions {
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
