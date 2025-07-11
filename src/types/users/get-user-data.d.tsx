import { SiteData } from "../site-data.d";
import { Transaction } from "../transactions/transaction.d";
import { UserRole } from "./user-role.d";

export interface GetUserData {
  id: number;
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

  transactions?: Transaction[];

  sites?: SiteData[];

  error?: string;
  message?: string;
}
