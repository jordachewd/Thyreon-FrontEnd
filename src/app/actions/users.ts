"use server";

import { gqlFetch } from "@/lib/graphql/server-fetch";
import { revalidatePath } from "next/cache";

// Types
interface UserMutationResponse {
  status: "success" | "error" | "warning" | "info";
  message: string;
}

// Mutations
export async function createUser(input: {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}): Promise<UserMutationResponse> {
  const mutation = `
    mutation CreateUser($input: GqlCreateUserInput!) {
      createUser(input: $input) {
        status
        message
      }
    }
  `;

  const result = await gqlFetch<{ createUser: UserMutationResponse }>(
    mutation,
    { input }
  );

  revalidatePath("/admin/users");

  return result.createUser;
}

export async function updateUser(input: {
  clerkId: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}): Promise<UserMutationResponse> {
  const mutation = `
    mutation UpdateUser($input: GqlUpdateUserInput!) {
      updateUser(input: $input) {
        status
        message
      }
    }
  `;

  const result = await gqlFetch<{ updateUser: UserMutationResponse }>(
    mutation,
    { input }
  );

  revalidatePath("/admin/users");

  return result.updateUser;
}

export async function deleteUsers(clerkIds: string[]): Promise<UserMutationResponse> {
  const mutation = `
    mutation DeleteUsers($clerkIds: [String!]!) {
      deleteUsers(clerkIds: $clerkIds) {
        status
        message
      }
    }
  `;

  const result = await gqlFetch<{ deleteUsers: UserMutationResponse }>(
    mutation,
    { clerkIds }
  );

  revalidatePath("/admin/users");

  return result.deleteUsers;
}
