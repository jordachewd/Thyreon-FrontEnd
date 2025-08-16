"use client";

import { TooltipArrow } from "@/components/shared/TooltipArrow";
import sidebarNavItems from "@/constants/layout/sidebar-nav.const";
import { isSamePath } from "@/lib/utils/isSamePath";
import SidebarNavItem from "@/types/layout/sidebar-nav.d";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, memo } from "react";
import css from "@/styles/layout/admin/AdminSidebar.module.css";
import classNames from "classnames";
import { Badge } from "@mui/material";
import { useUserRole } from "@/lib/hooks/users/useUserRole";

interface AdminSidebarNavProps {
  isNavOpen: boolean;
}

function AdminSidebarNav({ isNavOpen }: AdminSidebarNavProps) {
  const pathname = usePathname();
  const { isAdmin } = useUserRole();

  const getNavItem = useCallback(
    (item: SidebarNavItem) => {
      const isActive = isSamePath(pathname, item.href);
      const activeCss = isActive ? css.linkActive : "";

      const linkCss = classNames(css.linkItem, activeCss);
      const labelCss = classNames(css.linkLabel, {
        [css.navItemOff]: isNavOpen,
      });

      return (
        <Link key={item.id} href={item.href} className={linkCss}>
          <TooltipArrow title={item.label} placement="right">
            {item.slug === "notifications" ? (
              <Badge badgeContent={4} color="warning">
                <span className={css.linkIcon}>
                  <i className={item.icon}></i>
                </span>
              </Badge>
            ) : (
              <span className={css.linkIcon}>
                <i className={item.icon}></i>
              </span>
            )}
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
        if (!isAdmin && item.isAdmin) return null;
        return getNavItem(item);
      })}
    </nav>
  );
}

export default memo(AdminSidebarNav);
