"use client";

import { TooltipArrow } from "@/components/shared/TooltipArrow";
import sidebarNavItems from "@/constants/layout/sidebar-nav.const";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { isSamePath } from "@/lib/utils/isSamePath";
import css from "@/styles/layout/admin/AdminSidebar.module.css";
import SidebarNavItem from "@/types/layout/sidebar-nav.d";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, memo } from "react";

interface AdminSidebarNavProps {
  isNavOpen: boolean;
}

function AdminSidebarNav({ isNavOpen }: AdminSidebarNavProps) {
  const { isAdmin: isAuthAdmin } = useAdminAuth();
  const pathname = usePathname();

  const getNavItem = useCallback(
    (item: SidebarNavItem) => {
      const isActive = isSamePath(pathname, item.href);

      const linkCss = classNames(css.linkItem, { [css.linkActive]: isActive });
      const labelCss = classNames(css.linkLabel, {
        [css.navItemOff]: isNavOpen,
      });

      return (
        <Link key={item.id} href={item.href} className={linkCss}>
          <TooltipArrow title={item.label} placement="right">
            <span className={css.linkIcon}>
              <i className={item.icon}></i>
            </span>
          </TooltipArrow>
          <span className={labelCss}>{item.label}</span>
        </Link>
      );
    },
    [isNavOpen, pathname]
  );

  return (
    <nav className={css.navigation}>
      {sidebarNavItems.map((item) => {
        if (!isAuthAdmin && item.isAdmin) return null;
        return getNavItem(item);
      })}
    </nav>
  );
}

export default memo(AdminSidebarNav);
