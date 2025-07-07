"use server";

import { patch } from "@/lib/api/patch";
import { UpdateUserData } from "@/types/users/update-user-data.d";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export default async function updateUser(formData: UpdateUserData) {
  const { clerkId } = formData;

  const whoIs = await currentUser();

  if (!whoIs || whoIs.publicMetadata.role !== "admin") {
    return { status: "error", message: "Unauthorized action!" };
  }

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

  if (response.status === "error") {
    return response;
  }

  revalidateTag("users");
  return response;
}
