import { CreateUserData } from "@/types/create-user-data.d";
import { UpdateUserData } from "@/types/update-user-data.d";

export const dummyUserFormData: CreateUserData = {
  clerkId: "clerk_1234567890",
  username: "wpguard",
  password: "Test123456@#$%",
  email: "wpguard@example.com",
  role: "lite",
  billing: "monthly",
  firstName: "WP",
  lastName: "Guard",
};

export const dummyUserUpdateData: UpdateUserData = {
  username: "testuser123",
 // email: "wpguard@example.com",
  role: "lite",
  billing: "monthly",
 // firstName: "WP",
 // lastName: "Guard",
};
