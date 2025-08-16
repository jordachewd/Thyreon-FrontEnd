import { AccountBaseType } from "./account-base.d";
import { GetSiteData } from "../sites/get-site-data.d";

export interface AccountSitesType extends AccountBaseType {
  data: GetSiteData[];
}
