import { GetUserData } from "../users/get-user-data.d";

export interface GetSiteData {
  id: number;
  user?: GetUserData;
  siteName: string;
  userId: string;
  domain: string;
  apiKey: string;
  createdAt: Date | string;
  lastSeen: Date | string;
}
