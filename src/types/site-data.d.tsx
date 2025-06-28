import { SiteBackupData } from "./site-backoup.d";
import { SiteLogData } from "./site-log.d";
import { SiteSettingsData } from "./site-settings-data.d";

export interface SiteData {
  id?: number;
  userId?: number;
  domain?: string;
  apiKey?: string;
  lastSeen?: Date;
  backups?: SiteBackupData[];
  logs?: SiteLogData[];
  settings?: SiteSettingsData;
}
