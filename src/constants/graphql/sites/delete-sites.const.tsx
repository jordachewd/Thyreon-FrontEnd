import { gql } from "@apollo/client";

export const DELETE_SITES = gql`
  mutation DeleteSites($ids: [Int!]!) {
    deleteSites(ids: $ids) {
      status
      message
    }
  }
`;
