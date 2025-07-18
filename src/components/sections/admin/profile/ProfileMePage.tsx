"use client";

import ProfileBilling from "@/components/sections/admin/profile/ProfileBilling";
import ProfileHero from "@/components/sections/admin/profile/ProfileHero";
import { GetUserData } from "@/types/users/get-user-data.d";
import { gql } from "@apollo/client";

const GET_ME_QUERY = gql`
  query GetMe {
    me {
      role
      clerkImg
      firstName
      lastName
      username
      createdAt
      updatedAt
      currentPlan {
        billing
      }
    }
  }
`;

const GET_ME_TRANSACTIONS = gql`
  query GetMe {
    me {
      currentPlan {
        billing
        stripeId
      }
      transactions {
        plan
        amount
        billing
        stripeId
        createdAt
        expiresAt
      }
    }
  }
`;

export default function ProfileMePage() {
  return (
    <>
      <ProfileHero
        title="Profile Overview"
        query={GET_ME_QUERY}
        dataSelector={(data: { me?: GetUserData } | undefined) =>
          data?.me as GetUserData
        }
      />
      <ProfileBilling
        title="Transaction History"
        query={GET_ME_TRANSACTIONS}
        dataSelector={(data: { me?: GetUserData } | undefined) =>
          data?.me as GetUserData
        }
      />
    </>
  );
}
