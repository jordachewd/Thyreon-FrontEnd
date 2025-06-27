import { SiteData } from "./site-data.d";
import { UserBilling } from "./user-billing.d";
import { UserRole } from "./user-role.d";

export interface UpdateUserData {
  id?: number;
  clerkId?: string;
  username?: string;
  email?: string;
  role?: UserRole;
  billing?: UserBilling;
  registerAt?: Date;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userImg?: string | File;
  sites?: SiteData[];
}
