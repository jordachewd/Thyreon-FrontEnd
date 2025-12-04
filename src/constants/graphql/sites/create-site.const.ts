import { AlertSeverity } from "@/context/types/alert-msg-params.d";
import { gql, TypedDocumentNode } from "@apollo/client";

export interface CreateSiteMutationResponse {
  createSite: {
    status: AlertSeverity;
    message: string;
    site: {
      apiKey: string;
    };
  };
}

export const CREATE_SITE_MUTATION: TypedDocumentNode<CreateSiteMutationResponse> = gql`
  mutation CreateSite($input: GqlCreateSiteInput!) {
    createSite(input: $input) {
      status
      message
      site {
        apiKey
      }
    }
  }
`;
