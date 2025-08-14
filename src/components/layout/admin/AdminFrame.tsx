"use client";

import css from "../../../styles/layout/admin/AdminFrame.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getActivePath } from "@/lib/utils/getActivePath";
import { AdminNavItemType, AdminSlotKey } from "@/constants/layout/admin-nav.const";
import { useAdminContext } from "@/context/admin/AdminContext";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";

export default function AdminFrame({
  tabs,
  slots,
  overview,
}: {
  tabs: ReadonlyArray<AdminNavItemType>;
  slots: Record<AdminSlotKey, React.ReactNode>;
  overview: React.ReactNode;
}) {
  const { meCtx } = useAdminContext();
  const { data, loading, error } = meCtx;

  const pathname = usePathname();
  const active = getActivePath(pathname);

  if (loading) return <LoadingBubbles wrapped fullHeight />;
  if (error) return <ErrorCard error={error.message} />;

  const isAdmin = data.me?.role === "admin";

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
