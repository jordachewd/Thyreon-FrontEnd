"use server";

import { get } from "@/lib/api/get";

export default async function getUserById<T>(id: string | number) {
  return await get<T>(`users/${id}`);
}
