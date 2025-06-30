import { CreateUserData } from "@/types/create-user-data.d";
import { GetUserData } from "@/types/get-user-data.d";
import { UpdateUserData } from "@/types/update-user-data.d";

export const dummyUserFormData: CreateUserData = {
  clerkId: "clerk_1234567890999",
  username: "testuser124",
  password: "Test123456@#$%",
  email: "testuser124@example.com",
  role: "lite",
  billing: "monthly",
  // firstName: "WP",
  // lastName: "Guard",
};

export const dummyUserUpdateData: UpdateUserData = {
  username: "wpguard",
  email: "testuser000@example.com",
  role: "pro",
  billing: "monthly",
  // firstName: "WP",
  // lastName: "Guard",
};

export const dummyOneUserDeleteData: GetUserData = {
  username: "testuser123",
  email: "test.user@example.com",
};
