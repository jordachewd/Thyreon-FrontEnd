import { GetSiteData } from "../sites/get-site-data.d";
import { AccountBaseType } from "./account-base.d";

export interface AccountSitesType extends AccountBaseType {
  sites: GetSiteData[];
}
