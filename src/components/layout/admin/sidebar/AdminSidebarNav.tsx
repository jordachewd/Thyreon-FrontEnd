"use client";

import css from "@/styles/layout/admin/AdminSidebar.module.css";
import { memo } from "react";
import Link from "next/link";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import sidebarNavItems from "@/constants/sidebar-nav.const";
import SidebarNavItem from "@/types/sidebar-nav.d";
import Typography from "@mui/material/Typography";

interface AdminSidebarNavProps {
  isAdmin: boolean;
  isNavOpen: boolean;
}

function AdminSidebarNav({ isNavOpen, isAdmin }: AdminSidebarNavProps) {
  const getNavItem = (item: SidebarNavItem) => (
    <Link key={item.id} href={item.href} className={css.linkItem}>
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

  return (
    <nav className={css.navigation}>
      <div className={css.navTop}>
        {sidebarNavItems.map((item) => {
          if (item.isAdmin) return null;
          return getNavItem(item);
        })}
      </div>

      {isAdmin && (
        <div className={css.navBottom}>
          <Typography variant="h6">Admin Navigation</Typography>
          {sidebarNavItems.map((item) => {
            if (!item.isAdmin) return null;
            return getNavItem(item);
          })}
        </div>
      )}
    </nav>
  );
}

export default memo(AdminSidebarNav);
