export interface SiteSettingsData {
  id: number;
  siteId: number;
  autoBackup: boolean;
  autoUpdate: boolean;
  scanEnabled: boolean;
  backupFreq: "daily" | "weekly" | "monthly";
}
