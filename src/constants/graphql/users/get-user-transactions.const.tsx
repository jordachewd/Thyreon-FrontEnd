import { gql } from "@apollo/client";

export const USER_TRANSACTIONS_QUERY = gql`
  query GetMe {
    me {
      id
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
