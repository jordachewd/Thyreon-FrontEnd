export const sitesNavSlots = {
  info: "info",
  health: "health",
  reports: "reports",
  backups: "backups",
  security: "security",
  updates: "updates",
  settings: "settings",
} as const;

export type SiteSlotKey = keyof typeof sitesNavSlots;
export type SiteNavItemType = { slug: SiteSlotKey; label: string };

export const sitesNavItems: ReadonlyArray<SiteNavItemType> = [
  { slug: "info", label: "Info" },
  { slug: "health", label: "Health" },
  { slug: "reports", label: "Reports" },
  { slug: "backups", label: "Backups" },
  { slug: "security", label: "Security" },
  { slug: "updates", label: "Updates" },
  { slug: "settings", label: "Settings" },
] as const;
