import { AlertSeverity } from "@/context/types/alert-msg-params.d";
import { gql, TypedDocumentNode } from "@apollo/client";

export interface RegenerateApiKeyMutationResponse {
  regenerateApiKey: {
    status: AlertSeverity;
    message: string;
    site: {
      apiKey: string;
    };
  };
}

export const REGENERATE_API_KEY: TypedDocumentNode<RegenerateApiKeyMutationResponse> = gql`
  mutation RegenerateApiKey($id: Int!) {
    regenerateApiKey(id: $id) {
      status
      message
      site {
        apiKey
      }
    }
  }
`;
