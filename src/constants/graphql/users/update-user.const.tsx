import { AlertSeverity } from "@/context/types/alert-msg-params.d";
import { gql, TypedDocumentNode } from "@apollo/client";

export interface UpdateUserMutationResponse {
  updateUser: {
    status: AlertSeverity;
    message: string;
  };
}

export const UPDATE_USER_MUTATION:TypedDocumentNode<UpdateUserMutationResponse> = gql`
  mutation UpdateUser($input: GqlUpdateUserInput!) {
    updateUser(input: $input) {
      status
      message
    }
  }
`;
