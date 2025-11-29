import { AlertSeverity } from "@/context/types/alert-msg-params.d";
import { gql, TypedDocumentNode } from "@apollo/client";

export interface UpdateSiteMutationResponse {
  updateSite: {
    status: AlertSeverity;
    message: string;
    site: {
      domain: string;
      siteName: string;
      apiKey: string;
    };
  };
}

export const UPDATE_SITE_MUTATION: TypedDocumentNode<UpdateSiteMutationResponse> = gql`
  mutation UpdateSite($id: Int!, $input: GqlUpdateSiteInput!) {
    updateSite(id: $id, input: $input) {
      status
      message
      site {
        domain
        siteName
        apiKey
      }
    }
  }
`;
