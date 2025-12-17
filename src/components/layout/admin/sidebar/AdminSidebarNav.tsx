"use client";

import { Tooltip } from "@/components/ui";
import sidebarNavItems from "@/constants/layout/sidebar-nav.const";
import { isSamePath } from "@/lib/utils/isSamePath";
import SidebarNavItem from "@/types/layout/sidebar-nav.d";
import { UserRole } from "@/types/users/user-role.d";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, memo } from "react";

interface AdminSidebarNavProps {
  isNavOpen: boolean;
  role: UserRole;
}

function AdminSidebarNav({ isNavOpen, role }: AdminSidebarNavProps) {
  const isAuthAdmin = role === "admin";
  const pathname = usePathname();

  const getNavItem = useCallback(
    (item: SidebarNavItem) => {
      const isActive = isSamePath(pathname, item.href);

      const linkCss = classNames("admin-sidebar-link-item", { "admin-sidebar-link-active": isActive });
      const labelCss = classNames("admin-sidebar-link-label", {
        "admin-sidebar-nav-item-off": isNavOpen,
      });

      return (
        <Link key={item.id} href={item.href} className={linkCss}>
          <Tooltip title={item.label}>
            <span className="admin-sidebar-link-icon">
              <i className={item.icon}></i>
            </span>
          </Tooltip>
          <span className={labelCss}>{item.label}</span>
        </Link>
      );
    },
    [isNavOpen, pathname]
  );

  return (
    <nav className="admin-sidebar-navigation">
      {sidebarNavItems.map((item) => {
        if (!isAuthAdmin && item.isAdmin) return null;
        return getNavItem(item);
      })}
    </nav>
  );
}

export default memo(AdminSidebarNav);
