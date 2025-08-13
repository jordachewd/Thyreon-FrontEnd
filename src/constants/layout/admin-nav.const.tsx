export const adminNavSlots = {
  users: "users",
  sites: "sites",
  transactions: "transactions",
  settings: "settings",
} as const;

export type SlotKey = keyof typeof adminNavSlots;
export type AdminNavItemType = { slug: SlotKey; label: string };

export const adminNavItems: ReadonlyArray<AdminNavItemType> = [
  { slug: "users", label: "Users" },
  { slug: "sites", label: "Sites" },
  { slug: "transactions", label: "Transactions" },
  { slug: "settings", label: "Settings" },
] as const;
