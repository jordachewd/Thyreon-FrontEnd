"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import {
  AdminNavItemType,
  AdminSlotKey,
} from "@/constants/layout/admin-nav.const";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { getActivePath } from "@/lib/utils/getActivePath";
import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "@/styles/layout/admin/AdminFrame.module.css";

export default function AdminFrame({
  tabs,
  slots,
  overview,
}: {
  tabs: ReadonlyArray<AdminNavItemType>;
  slots: Record<AdminSlotKey, React.ReactNode>;
  overview: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = getActivePath(pathname);

  const { isAdmin, loading, error } = useAdminAuth();

  if (loading) return <LoadingBubbles wrapped fullHeight />;
  if (error) return <ErrorCard error={error.message} />;

  if (!isAdmin)
    return (
      <ErrorCard
        title="Unauthorized"
        error="You do not have the necessary permissions to access this page."
      />
    );

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
