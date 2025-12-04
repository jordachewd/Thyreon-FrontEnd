import { AlertSeverity } from "@/context/types/alert-msg-params.d";
import { gql, TypedDocumentNode } from "@apollo/client";

export interface DeleteSitesMutationResponse {
  deleteSites: {
    status: AlertSeverity;
    message: string;
  };
}

export const DELETE_SITES: TypedDocumentNode<DeleteSitesMutationResponse> = gql`
  mutation DeleteSites($ids: [Int!]!) {
    deleteSites(ids: $ids) {
      status
      message
    }
  }
`;
