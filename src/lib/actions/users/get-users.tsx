"use server";

import { get } from "@/lib/api/get";
import { GetUserData } from "@/types/get-user-data.d";

export default async function getUsers() {
  return await get<GetUserData[]>("users");
}
