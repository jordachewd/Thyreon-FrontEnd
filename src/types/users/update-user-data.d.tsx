import { SiteData } from "../site-data.d";
import { UserRole } from "./user-role.d";

export interface UpdateUserData {
  clerkId: string;
  clerkImg?: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  plan?: string;
  role: UserRole;

  createdAt?: Date | string;
  updatedAt?: Date | string;

  sites?: SiteData[];
}
