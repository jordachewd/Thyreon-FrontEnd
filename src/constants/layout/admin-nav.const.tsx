import { adminNavSlots } from "./admin-nav-slots.const";

type AdminSlotKey = keyof typeof adminNavSlots;
export type AdminNavItemType = { slug: AdminSlotKey; label: string };

export const adminNavItems: ReadonlyArray<AdminNavItemType> = [
  { slug: "transactions", label: "Transactions" },
] as const;
