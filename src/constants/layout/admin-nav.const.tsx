import { adminNavSlots } from "./admin-nav-slots.const";

export type AdminSlotKey = keyof typeof adminNavSlots;
export type AdminNavItemType = { slug: AdminSlotKey; label: string };

export const adminNavItems: ReadonlyArray<AdminNavItemType> = [
  { slug: "users", label: "Users" },
  { slug: "sites", label: "Sites" },
  { slug: "transactions", label: "Transactions" },
  { slug: "settings", label: "Settings" },
] as const;
