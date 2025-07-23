import { gql } from "@apollo/client";

export const GET_TRANSACTIONS_QUERY = gql`
  query GetAllTransactions {
    transactions {
      id
      userId
      plan
      amount
      billing
      stripeId
      createdAt
      expiresAt
      user {
        id
        email
        firstName
        lastName
        username
      }
    }
  }
`;
