"use client";

import { Transaction } from "@/types/transactions/transaction.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    users {
      id
      clerkId
      email
      username
      firstName
      lastName
      role
      plan
      createdAt
      updatedAt
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

export default function TestingGraphql() {
  const { data, loading, error } = useQuery<{ users: GetUserData[] }>(
    GET_ALL_USERS_QUERY
  );

  if (loading)
    return <p className="flex p-4 text-green-500">Loading users...</p>;
  if (error)
    return <p className="flex p-4 text-red-600">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2>Users:</h2>
      {data?.users.map((user: GetUserData) => (
        <div key={user.id} className="mb-4 border-b pb-2">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Plan:</strong> {user.plan}
          </p>
          {user.transactions && user.transactions.length > 0 && (
            <ul className="mt-2 pl-4 text-sm">
              {user.transactions.map((tx: Transaction) => (
                <li key={tx.id} className="mb-2 border-b pb-2">
                  StripeID: {tx.stripeId}
                  <br />
                  Plan: {tx.plan}
                  <br />
                  Billing: {tx.billing}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
