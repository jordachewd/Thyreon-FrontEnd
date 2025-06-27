"use server";

import { patch } from "@/lib/api/patch";
import { UpdateUserData } from "@/types/update-user-data.d";
import { revalidateTag } from "next/cache";

export default async function updateUser(formData: UpdateUserData) {
  const { username, userImg, ...rest } = formData;
  if (!username) return;

  const userData = new FormData();

  for (const [key, value] of Object.entries(rest)) {
    if (value !== undefined && value !== null) {
      userData.append(key, String(value));
    }
  }

  if (userImg instanceof File) {
    userData.append(
      "image",
      new File([userImg], `avatar-${userImg.name}`, { type: userImg.type })
    );
  }

  const response = await patch(`users/update/${username}`, userData);

  if (response.status === "error") {
    return response;
  }

  revalidateTag("users");
  return await response;
}
