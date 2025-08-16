import { GetSiteData } from "../sites/get-site-data.d";
import { TransactionType } from "../transactions/transaction.d";
import { UserRole } from "./user-role.d";

export interface GetUserData {
  id: number;
  role: UserRole;
  email: string;
  username: string;
  clerkId: string;
  clerkImg?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  transactions?: TransactionType[];
  currentPlan?: TransactionType;
  sites?: GetSiteData[];
}
