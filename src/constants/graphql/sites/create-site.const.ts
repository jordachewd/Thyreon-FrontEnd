import { gql } from "@apollo/client";

export const CREATE_SITE_MUTATION = gql`
  mutation CreateSite($input: GqlCreateSiteInput!) {
    createSite(input: $input) {
      status
      message
    }
  }
`;

/* 

export const CREATE_SITE_MUTATION = gql`
  mutation CreateSite($input: GqlCreateSiteInput!) {
    createSite(input: $input) {
      status
      message
      site {
        id
        domain
        siteName
      }
    }
  }
`;
 */
