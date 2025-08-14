import { Transaction } from "../transactions/transaction.d"; 
import { AccountBaseType } from "./account-base.d";

export interface AccountBillingType extends AccountBaseType {
  data: Transaction[];
  currentPlan: string;
}
