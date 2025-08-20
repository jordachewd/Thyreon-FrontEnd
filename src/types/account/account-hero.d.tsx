import { GetUserInfo } from "../users/get-user-info.d";
import { AccountBaseType } from "./account-base.d";

export interface AccountHeroType extends AccountBaseType {
  userInfo: GetUserInfo;
}
