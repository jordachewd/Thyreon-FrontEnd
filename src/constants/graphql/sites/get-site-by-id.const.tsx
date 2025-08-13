import { gql } from "@apollo/client";

export const GET_SITE_BY_ID = gql`
  query GetSiteById($id: Int!) {
    siteById(id: $id) {
      id
      siteName
      domain
      status
      createdAt
      lastSeen
    }
  }
`;
