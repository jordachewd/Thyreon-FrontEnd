import { SiteData } from "../site-data.d";
import { UserRole } from "./user-role.d";

export interface GetUserData {
  id: number;
  clerkId: string;
  email: string;
  username: string;
  role?: UserRole;
  firstName?: string;
  lastName?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  sites?: SiteData[];
}
