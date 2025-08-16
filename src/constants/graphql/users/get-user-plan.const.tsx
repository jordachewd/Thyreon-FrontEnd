import { gql } from "@apollo/client";

export const USER_PLAN_QUERY = gql`
  query GetMe {
    me {
      id
      currentPlan {
        plan
        billing
        stripeId
        expiresAt
      }
    }
  }
`;
