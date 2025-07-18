"use client";

import LoadingBubbles from "@/components/shared/LoadingBubbles";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { Transaction } from "@/types/transactions/transaction.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import { gql, useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    users {
      id
      email
      username
      firstName
      lastName
      role
      clerkId
      clerkImg
      createdAt
      updatedAt
      currentPlan {
        id
        stripeId
        plan
        billing
        amount
        createdAt
        expiresAt
      }
      transactions {
        id
        stripeId
        plan
        billing
        amount
        createdAt
        expiresAt
      }
    }
  }
`;

export default function TestGetAllUsersGql() {
  const { data, loading, error } = useQuery<{ users: GetUserData[] }>(
    GET_ALL_USERS_QUERY
  );

  if (loading) return <LoadingBubbles wrapped />;
  if (error)
    return <p className="flex p-4 text-red-600">Error: {error.message}</p>;

  const users = data?.users;

  console.log("Fetched Users:", users);

  return (
    <div className="flex flex-col w-full py-4 border-b">
      <Typography variant="h5" color="green">
        GraphQL / GetAllUsers
      </Typography>
      {users?.map((user: GetUserData) => (
        <div
          key={user.id}
          className="flex flex-col md:flex-row gap-4 border-t !py-4"
        >
          <div className="flex flex-col mr-6 pt-2.5">
            {user.clerkImg ? (
              <Image
                src={String(user.clerkImg)}
                alt="User Image"
                width={64}
                height={64}
              />
            ) : (
              <>No Image Yet</>
            )}
          </div>
          <div className="flex flex-col flex-1 gap-0.5">
            <Typography variant="h6" className="mb-2!">
              {user.firstName} {user.lastName}
            </Typography>
            <p>
              <strong>User ID: </strong> {user.id}
            </p>
            <p>
              <strong>Clerk ID: </strong> {user.clerkId}
            </p>
            <p>
              <strong>Active Plan ID: </strong> {user?.currentPlan?.plan}
            </p>
            <p>
              <strong>Email: </strong> {user.email}
            </p>
            <p>
              <strong>Username: </strong> {user.username}
            </p>
            <p>
              <strong>Role: </strong> {user.role}
            </p>
            <p>
              <strong>Member since: </strong>
              {getFormattedDate(user.createdAt as Date)}
            </p>
            <p>
              <strong>Last seen: </strong>
              {getFormattedDate(user.updatedAt as Date)}
            </p>
          </div>
          {user.transactions && user.transactions.length > 0 && (
            <div className="flex flex-col w-full md:w-1/2">
              <Typography variant="h6" className="mb-2!">
                Transactions
              </Typography>
              <ul className="flex flex-col my-1 text-xs">
                {user.transactions.map((tx: Transaction) => (
                  <li key={tx.id} className="mb-4">
                    <p>
                      <strong>Plan: </strong>
                      <span className="capitalize">{tx.plan}</span>,
                      <strong> Billing: </strong>
                      <span className="capitalize">{tx.billing}</span>,
                      <strong> Amount: </strong>
                      {"€" + tx.amount}
                    </p>
                    <p>
                      <strong>StripeID: </strong>
                      {tx.stripeId}
                    </p>
                    <p>
                      <strong> From: </strong>
                      {getFormattedDate(tx.createdAt as Date)}
                    </p>
                    <p>
                      <strong>Expires At: </strong>
                      {getFormattedDate(tx.expiresAt as Date)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
