import { SiteData } from "../sites/site-data.d";
import { AccountBaseType } from "./account-base.d";

export interface AccountSitesType extends AccountBaseType {
  data: SiteData[];
}
