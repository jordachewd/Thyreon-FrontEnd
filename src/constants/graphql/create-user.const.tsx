import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: GqlCreateUserInput!) {
    createUser(input: $input) {
      status
      message
    }
  }
`;
