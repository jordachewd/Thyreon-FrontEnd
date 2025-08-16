import { TransactionType } from "../transactions/transaction.d"; 
import { AccountBaseType } from "./account-base.d";

export interface AccountBillingType extends AccountBaseType {
  data: TransactionType[];
  currentPlan: string;
}
