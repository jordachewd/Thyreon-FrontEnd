export interface SiteBackupData {
  id: number;
  siteId: number;
  fileUrl: string;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}
