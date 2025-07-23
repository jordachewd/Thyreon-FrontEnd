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
  role: UserRole;

  transactions?: Transaction[];
  currentPlan?: Transaction;

  createdAt?: Date | string;
  updatedAt?: Date | string;

  sites?: SiteData[];

  // error?: string;
  // message?: string;
}
