import { GetUserData } from "../users/get-user-data.d";

type SiteStatus = "active" | "inactive" | "revoked";

export interface GetSiteData {
  id: number;
  domain: string;
  siteName: string;
  user?: GetUserData;  
  userId?: string;
  status?: SiteStatus;
  createdAt?: Date | string;
  lastSeen?: Date | string;
}
