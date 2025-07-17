"use client";

import css from "@/styles/layout/admin/AdminSidebar.module.css";
import { memo } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { GetUserData } from "@/types/users/get-user-data.d";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import sidebarNavItems from "@/constants/sidebar-nav.const";
import SidebarNavItem from "@/types/sidebar-nav.d";

const GET_ME_USER_QUERY = gql`
  query GetMe {
    me {
      role
    }
  }
`;

interface AdminSidebarNavProps {
  isNavOpen: boolean;
}

function AdminSidebarNav({ isNavOpen }: AdminSidebarNavProps) {
  const { data, loading, error } = useQuery<{ me: GetUserData }>(
    GET_ME_USER_QUERY
  );

  if (loading)
    return (
      <nav className={css.navigation}>
        <LoadingBubbles wrapped />
      </nav>
    );

  if (error)
    return (
      <nav className={css.navigation}>
        <p className="flex p-4 text-red-600">Error: {error.message}</p>
      </nav>
    );

  const isAdmin = data?.me.role === "admin";

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
