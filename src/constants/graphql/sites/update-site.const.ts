import { gql } from "@apollo/client";

export const UPDATE_SITE_MUTATION = gql`
  mutation UpdateSite($input: GqlUpdateSiteInput!) {
    updateSite(input: $input) {
      siteName
      domain
    }
  }
`;
