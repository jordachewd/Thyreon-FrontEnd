"use server";
import { get } from "@/lib/api/get";
import { GetUserData } from "@/types/users/get-user-data.d";

export default async function getCurrentUser() {
  return await get<GetUserData>(`users/me`);
}
