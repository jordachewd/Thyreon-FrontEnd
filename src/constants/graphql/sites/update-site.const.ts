import { gql } from "@apollo/client";

export const UPDATE_SITE_MUTATION = gql`
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
