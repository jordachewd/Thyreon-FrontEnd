export interface GetSiteData {
  id: string;
  siteName: string;
  userId: string;
  domain: string;
  apiKey: string;
  createdAt: Date | string;
  lastSeen: Date | string;
}
