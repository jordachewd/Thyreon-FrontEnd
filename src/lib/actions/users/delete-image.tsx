"use server";

import { del } from "@/lib/api/delete";
import { revalidateTag } from "next/cache";

export default async function deleteUserImage(username: string) {
  const deleteImage = await del(`users/${username}/image`);

  if (deleteImage.status === "error") {
    return deleteImage;
  }
  revalidateTag("users");
  return deleteImage;
}
