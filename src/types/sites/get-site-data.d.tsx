import { GetUserData } from "../users/get-user-data.d";

type SiteStatus = "active" | "inactive" | "revoked";

export interface GetSiteData {
  id: number;
  user?: GetUserData;
  siteName: string;
  userId: string;
  domain: string;
  status: SiteStatus;
  createdAt: Date | string;
  lastSeen: Date | string;
}
