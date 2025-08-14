"use client";

import { TooltipArrow } from "@/components/shared/TooltipArrow";
import sidebarNavItems from "@/constants/layout/sidebar-nav.const";
import SidebarNavItem from "@/types/layout/sidebar-nav.d";
import Link from "next/link";
import { memo, useCallback } from "react";
import css from "@/styles/layout/admin/AdminSidebar.module.css";
import { usePathname } from "next/navigation";
import { isSamePath } from "@/lib/utils/isSamePath";

interface AdminSidebarNavProps {
  isNavOpen: boolean;
  isAdmin: boolean;
}

function AdminSidebarNav({ isNavOpen, isAdmin }: AdminSidebarNavProps) {
  const pathname = usePathname();

  const getNavItem = useCallback(
    (item: SidebarNavItem) => {
      const isActive = isSamePath(pathname, item.href);
      const activeCss = isActive ? css.linkActive : "";

      return (
        <Link
          key={item.id}
          href={item.href}
          className={`${css.linkItem} ${activeCss}`}
        >
          <TooltipArrow title={item.label} placement="right">
            <span className={css.linkIcon}>
              <i className={item.icon}></i>
            </span>
          </TooltipArrow>
          <span className={`${css.linkLabel} ${isNavOpen && css.navItemOff}`}>
            {item.label}
          </span>
        </Link>
      );
    },
    [isNavOpen, pathname]
  );

  return (
    <nav className={css.navigation}>
      <div className={css.navTop}>
        {sidebarNavItems.map((item) => {
          if (!isAdmin && item.isAdmin) return null;
          return getNavItem(item);
        })}
      </div>

      <div className={css.navBottom}>Nav Footer</div>
    </nav>
  );
}

export default memo(AdminSidebarNav);
