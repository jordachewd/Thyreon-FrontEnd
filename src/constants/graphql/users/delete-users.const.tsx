import { AlertSeverity } from "@/context/types/alert-msg-params.d";
import { gql, TypedDocumentNode } from "@apollo/client";

export interface DeleteUsersMutationResponse {
  deleteUsers: {
    status: AlertSeverity;
    message: string;
  };
}

export const DELETE_USERS: TypedDocumentNode<DeleteUsersMutationResponse> = gql`
  mutation DeleteUsers($clerkIds: [String!]!) {
    deleteUsers(clerkIds: $clerkIds) {
      status
      message
    }
  }
`;
