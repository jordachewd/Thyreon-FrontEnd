import { AlertSeverity } from "@/context/types/alert-msg-params.d";
import { TypedDocumentNode, gql } from "@apollo/client";

export interface CreateUserMutationResponse {
  createUser: {
    status: AlertSeverity;
    message: string;
  };
}

export const CREATE_USER_MUTATION: TypedDocumentNode<CreateUserMutationResponse> = gql`
  mutation CreateUser($input: GqlCreateUserInput!) {
    createUser(input: $input) {
      status
      message
    }
  }
`;
