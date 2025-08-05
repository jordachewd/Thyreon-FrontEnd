import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: GqlUpdateUserInput!) {
    updateUser(input: $input) {
      status
      message
      test
    }
  }
`;
