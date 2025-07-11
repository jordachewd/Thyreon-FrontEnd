"use server";
import { post } from "@/lib/api/post";
import { revalidateTag } from "next/cache";
import { CreateUserData } from "@/types/users/create-user-data.d";

export default async function createUser(formData: CreateUserData) {
  const response = await post("users/new", formData);

  if (response.error || response.status === "error") {
    return {
      status: "error",
      message: response.message || "An error occurred while creating the user.",
    };
  }

  revalidateTag("users");
  return response;
}
