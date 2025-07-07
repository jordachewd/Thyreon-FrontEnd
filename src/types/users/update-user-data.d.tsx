import { SiteData } from "../site-data.d";
import { UserRole } from "./user-role.d";

export interface UpdateUserData {
  clerkId: string;
  username: string;
  email: string;
  role?: UserRole;
  firstName?: string;
  lastName?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  sites?: SiteData[];
}
