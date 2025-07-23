import { gql } from "@apollo/client";

export const GET_ME_QUERY = gql`
  query GetMe {
    me {
      role
      email
      clerkImg
      firstName
      lastName
      username
      createdAt
      updatedAt
      currentPlan {
        plan
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
