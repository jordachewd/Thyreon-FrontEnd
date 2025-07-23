import { gql } from "@apollo/client";

export const DELETE_SITE_MUTATION = gql`
  mutation DeleteSite($id: Int!) {
    deleteSite(id: $id) {
      id
    }
  }
`;
