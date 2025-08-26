"use client";

import {
  AdminNavItemType,
  AdminSlotKey,
} from "@/constants/layout/admin-nav.const";
import { getActivePath } from "@/lib/utils/getActivePath";
import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "@/styles/layout/admin/AdminFrame.module.css";
import { ReactNode } from "react";

export default function AdminFrame({
  tabs,
  slots,
  overview,
}: {
  tabs: ReadonlyArray<AdminNavItemType>;
  slots: Record<AdminSlotKey, ReactNode>;
  overview: ReactNode;
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
            <span>Overview</span>
            {!active && <i className="bi bi-arrow-right"></i>}
          </Link>

          {tabs.map((tab) => (
            <Link
              key={tab.slug}
              href={`/admin/${tab.slug}`}
              prefetch={false}
              className={active === tab.slug ? css.activeTab : ""}
            >
              <span> {tab.label}</span>
              {active === tab.slug && <i className="bi bi-arrow-right"></i>}
            </Link>
          ))}
        </nav>
      </aside>

      <main className={css.content}>
        {!active ? overview : slots[active as AdminSlotKey]}
      </main>
    </div>
  );
}
