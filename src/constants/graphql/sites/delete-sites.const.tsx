import { gql } from "@apollo/client";

export const DELETE_SITES = gql`
  mutation DeleteSites($siteIds: [Int!]!) {
    deleteSites(siteIds: $siteIds) {
      status
      message
    }
  }
`;
