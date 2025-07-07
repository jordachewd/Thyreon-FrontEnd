"use server";
import { post } from "@/lib/api/post";
import { revalidateTag } from "next/cache";
import { CreateUserData } from "@/types/users/create-user-data.d";
import { currentUser } from "@clerk/nextjs/server";

export default async function createUser(formData: CreateUserData) {
  const whoIs = await currentUser();

  if (!whoIs || whoIs.publicMetadata.role !== "admin") {
    return { status: "error", message: "Unauthorized action!" };
  }

  const response = await post("users/new", formData);

  if (response.status === "error") {
    return response;
  }

  revalidateTag("users");
  return {
    user: response,
    status: "success",
    message: "User created successfully!",
  };
}
