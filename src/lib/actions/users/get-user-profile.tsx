"use server";

import { get } from "@/lib/api/get";
import { GetUserData } from "@/types/get-user-data.d";

export default async function getUserProfile(username: string) {
  return await get<GetUserData>(`users/profile/${username}`);
}
