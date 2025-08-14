export const sitesNavSlots = {
  registry: "registry",
  updates: "updates",
  backups: "backups",
  security: "security",
} as const;

export type SitesSlotKey = keyof typeof sitesNavSlots;
export type SitesNavItemType = { slug: SitesSlotKey; label: string };

export const sitesNavItems: ReadonlyArray<SitesNavItemType> = [
  { slug: "registry", label: "Registry" },
  { slug: "updates", label: "Updates" },
  { slug: "backups", label: "Backups" },
  { slug: "security", label: "Security" },
] as const;
