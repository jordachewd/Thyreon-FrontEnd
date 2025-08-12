import { gql } from "@apollo/client";

export const REGENERATE_API_KEY = gql`
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
