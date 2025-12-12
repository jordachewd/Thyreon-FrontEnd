export const GET_CURRENT_USER_QUERY = `
  query GetMe {
    me {
      id
      role
      email
      clerkImg
      firstName
      lastName
      username
      createdAt
      updatedAt
      currentPlan {
        id
        plan
        billing
        stripeId
        expiresAt
      }
      sites {
        id
        siteName
        domain
        createdAt
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
