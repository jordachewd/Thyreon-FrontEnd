export const GET_ALL_USERS_QUERY = `
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
      sitesCount
      currentPlan {
        id
        plan
        expiresAt
      }
    }
  }
`;
