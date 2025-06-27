"use server";
import { post } from "@/lib/api/post";
import { revalidateTag } from "next/cache";
import { CreateUserData } from "@/types/create-user-data.d";

export default async function createUser(formData: CreateUserData) {
  const response = await post("users", formData);

  if (response.status === "error") {
    return response;
  }

  revalidateTag("users");
  return response;
}
