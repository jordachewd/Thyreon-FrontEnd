import { Transaction } from "../transactions/transaction.d"; 
import { ProfileBaseType } from "./profile-base.d";

export interface ProfileBillingType extends ProfileBaseType {
  data: Transaction[];
  currentPlan: string;
}
