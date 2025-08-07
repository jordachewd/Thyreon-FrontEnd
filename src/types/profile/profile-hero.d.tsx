import { GetUserData } from "../users/get-user-data.d";
import { ProfileBaseType } from "./profile-base.d";

export interface ProfileHeroType extends ProfileBaseType {
  data: GetUserData;
}
