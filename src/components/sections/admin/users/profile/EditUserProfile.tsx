"use client";

import { gql } from "@apollo/client";
import ProfileHero from "../../profile/ProfileHero";
import { GetUserData } from "@/types/users/get-user-data.d";
import ProfileBilling from "../../profile/ProfileBilling";

const GET_USER_BY_ID = gql`
  query GetUserById($id: Int!) {
    userById(id: $id) {
      id
      role
      clerkImg
      firstName
      lastName
      username
      createdAt
      updatedAt
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

interface EditUserProps {
  userId: number;
}

export default function EditUserProfile({ userId }: EditUserProps) {
  return (
    <>
      <ProfileHero
        title="Profile Overview"
        titleSize="h5"
        alignTitle="left"
        query={GET_USER_BY_ID}
        variables={{ id: Number(userId) }}
        dataSelector={(data: { userById?: GetUserData } | undefined) =>
          data?.userById as GetUserData
        }
      />

      <ProfileBilling
        title="Transaction History"
        titleSize="h5"
        alignTitle="left"
        query={GET_USER_BY_ID}
        variables={{ id: Number(userId) }}
        dataSelector={(data: { userById?: GetUserData } | undefined) =>
          data?.userById as GetUserData
        }
      />
    </>
  );
}
