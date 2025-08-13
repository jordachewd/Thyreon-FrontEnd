"use client";

import css from "../../../styles/layout/admin/AdminFrame.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getActivePath } from "@/lib/utils/getActivePath";
import { AdminNavItemType, SlotKey } from "@/constants/layout/admin-nav.const";

export default function AdminFrame({
  tabs,
  slots,
  overview,
}: {
  tabs: ReadonlyArray<AdminNavItemType>;
  slots: Record<SlotKey, React.ReactNode>;
  overview: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = getActivePath(pathname);

  return (
    <div className={css.wrapper}>
      <aside className={css.sidebar}>
        <nav className={css.nav}>
          <Link
            prefetch={false}
            href="/admin"
            className={!active ? css.activeTab : ""}
          >
            Overview
          </Link>

          {tabs.map((tab) => (
            <Link
              key={tab.slug}
              href={`/admin/${tab.slug}`}
              prefetch={false}
              className={active === tab.slug ? css.activeTab : ""}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className={css.content}>
        {!active ? overview : slots[active as SlotKey]}
      </main>
    </div>
  );
}
