"use client";

import css from "../../../styles/layout/admin/AdminFrame.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getActivePath } from "@/lib/utils/getActivePath";
import {
  SitesNavItemType,
  SitesSlotKey,
} from "@/constants/layout/sites-nav.const";

export default function SitesFrame({
  tabs,
  slots,
  overview,
}: {
  tabs: ReadonlyArray<SitesNavItemType>;
  slots: Record<SitesSlotKey, React.ReactNode>;
  overview: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = getActivePath(pathname, "sites");

  return (
    <div className={css.wrapper}>
      <aside className={css.sidebar}>
        <nav className={css.nav}>
          <Link
            prefetch={false}
            href="/sites"
            className={!active ? css.activeTab : ""}
          >
            <span>Overview</span>
            {!active && <i className="bi bi-arrow-right"></i>}
          </Link>

          {tabs.map((tab) => (
            <Link
              key={tab.slug}
              href={`/sites/${tab.slug}`}
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
        {!active ? overview : slots[active as SitesSlotKey]}
      </main>
    </div>
  );
}
