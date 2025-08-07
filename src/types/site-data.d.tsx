import { GetUserData } from "./users/get-user-data.d";

export interface SiteData {
  id: number;
  domain: string;
  siteName: string;
  apiKey?: string;
  createdAt?: Date;
  lastSeen?: Date;
  user?: GetUserData; //
  // userId?: number;
  // backups?: SiteBackupData[];
  // logs?: SiteLogData[];
  // settings?: SiteSettingsData;
}
