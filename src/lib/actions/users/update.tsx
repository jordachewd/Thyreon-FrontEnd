"use server";

import { patch } from "@/lib/api/patch";
import { UpdateUserData } from "@/types/users/update-user-data.d";
//import { revalidateTag } from "next/cache";

export default async function updateUser(formData: UpdateUserData) {
  const { clerkId } = formData;

  if (!clerkId) {
    return {
      status: "error",
      message: "clerkId is required for updating user.",
    };
  }

  const userData = new FormData();

  for (const [key, value] of Object.entries(formData)) {
    if (value !== undefined && value !== null) {
      userData.append(key, String(value));
    }
  }

  const response = await patch(`users/update`, userData);

  if (response.error || response.status === "error") {
    return {
      status: "error",
      message: response.message || "An error occurred while creating the user.",
    };
  }

  //revalidateTag("users");
  return response;
}
