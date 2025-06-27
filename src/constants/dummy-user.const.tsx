import { GetUserData } from "@/types/get-user-data.d";

export const dummyUser: GetUserData = {
  id: 1,
  clerkId: "user_abc123xyz",
  username: "fixguru",
  email: "fixguru@example.com",
  role: "lite",
  billing: "yearly",
  firstName: "Jordan",
  lastName: "Smith",
  createdAt: new Date("2024-11-03T10:15:00Z"),
  updatedAt: new Date("2025-05-20T14:45:00Z"),
  userImg: "https://cdn.example.com/avatars/jordan-smith.png",
  sites: [],
};
