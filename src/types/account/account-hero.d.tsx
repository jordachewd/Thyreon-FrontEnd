import { GetUserData } from "../users/get-user-data.d";
import { AccountBaseType } from "./account-base.d";

export interface AccountHeroType extends AccountBaseType {
  data: GetUserData;
}
