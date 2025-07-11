"use server";

import { get } from "@/lib/api/get";

export default async function getUserTransactions(clerkId: string) {
  return await get(`users/${clerkId}/transactions`);
}
