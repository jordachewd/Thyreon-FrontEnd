import { TransactionType } from "../transactions/transaction.d";
import { AccountBaseType } from "./account-base.d";

export interface AccountBillingType extends AccountBaseType {
  transactions: TransactionType[];
  userPlanId: string;
}
