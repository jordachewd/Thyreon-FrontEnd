import { SiteData } from "../site-data.d";
import { ProfileBaseType } from "./profile-base.d";

export interface ProfileSitesType extends ProfileBaseType {
  data: SiteData[];
}
