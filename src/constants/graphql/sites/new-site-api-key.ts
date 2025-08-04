import { gql } from "@apollo/client";

export const REGENERATE_API_KEY = gql`
  mutation RegenerateApiKey($siteId: Int!) {
    regenerateApiKey(siteId: $siteId) {
      status
      message
      site {
        apiKey
      }
    }
  }
`;
