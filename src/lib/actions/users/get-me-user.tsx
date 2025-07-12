"use server";
import { get } from "@/lib/api/get";

interface GetCurrentUserOptions {
  transactions?: boolean;
  plan?: boolean;
}

export default async function getCurrentUser<T>({
  transactions = false,
  plan = false,
}: GetCurrentUserOptions = {}): Promise<T> {
  return await get<T>(
    `users/me`,
    ["transactions", "users"],
    new URLSearchParams({
      transactions: String(transactions),
      plan: String(plan),
    })
  );
}
