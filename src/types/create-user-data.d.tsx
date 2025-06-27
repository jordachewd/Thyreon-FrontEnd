import { SiteData } from "./site-data.d";
import { UserBilling } from "./user-billing.d";
import { UserRole } from "./user-role.d";

export interface CreateUserData {
  id: number;
  clerkId: string;
  username: string;
  email: string;

  role?: UserRole;
  billing?: UserBilling;

  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userImg?: string;
  sites?: SiteData[];
}
