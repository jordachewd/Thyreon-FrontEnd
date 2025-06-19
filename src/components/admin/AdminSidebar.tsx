"use client";

import Link from "next/link";
import Logo from "../shared/Logo";
import css from "@/styles/admin/AdminSidebar.module.css";
import { useAdminContext } from "@/context/AdminContext";
import sidebarNavItems from "@/constants/sidebar-nav.const";

export default function AdminSidebar() {
  const { sidebarCtx } = useAdminContext();
  const isNavOpen = sidebarCtx.isNavOpen;

  return (
    <aside
      id="AdminSidebar"
      className={`${css.wrapper} ${isNavOpen && css.navOpen}`}
    >
      <div className={css.logo}>
        <div className={css.logoSymbol}>
          <Logo href="/dashboard" symbol width={24} height={24} />
        </div>
        <div className={`${css.logoText} ${isNavOpen && css.navTextOff}`}>
          <Logo href="/dashboard" />
        </div>
      </div>

      <nav className={css.navigation}>
        {sidebarNavItems.map((item) => (
          <Link key={item.id} href={item.href} className={css.linkItem}>

            <span className={css.linkIcon}>
              <i className={`bi ${item.icon}`}></i>
            </span>

            <span className={`${css.linkLabel} ${isNavOpen && css.navItemOff}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
