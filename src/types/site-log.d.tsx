export interface SiteLogData {
  id: number;
  siteId: number;
  type: "update" | "backup" | "scan" | "error";
  status: "success" | "failed";
  message?: string;
  createdAt: Date;
}
