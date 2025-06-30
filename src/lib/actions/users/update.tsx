"use server";

import { patch } from "@/lib/api/patch";
import { UpdateUserData } from "@/types/update-user-data.d";
import { revalidateTag } from "next/cache";

export default async function updateUser(formData: UpdateUserData) {
  const { clerkId, ...rest } = formData;
  if (!clerkId) return;

  const userData = new FormData();

  for (const [key, value] of Object.entries(rest)) {
    if (value !== undefined && value !== null) {
      userData.append(key, String(value));
    }
  }

  const response = await patch(`users/update/${clerkId}`, userData);
  console.log("Response from updateUser:", response);

  if (response.status === "error") {
    return response;
  }

  revalidateTag("users");
  return await response;
}
