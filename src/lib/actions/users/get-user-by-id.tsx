"use server";

import { get } from "@/lib/api/get";
import { GetUserData } from "@/types/get-user-data.d";

export default async function getUserById(id: string | number) {
  return await get<GetUserData>(`users/${id}`);
}
