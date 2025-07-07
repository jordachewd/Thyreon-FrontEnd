"use client";

import Link from "next/link";
import Logo from "../../shared/Logo";
import css from "@/styles/layout/admin/AdminSidebar.module.css";
import { useAdminContext } from "@/context/AdminContext";
import sidebarNavItems from "@/constants/sidebar-nav.const";
import SidebarToggle from "../../sections/admin/SidebarToggle";
import ToggleTheme from "../../shared/ToggleTheme";
import TextField from "@mui/material/TextField";
import { TooltipArrow } from "../../shared/TooltipArrow";
import SidebarNavItem from "@/types/sidebar-nav.d";
import { useUser } from "@clerk/nextjs";
import { UserRole } from "@/types/users/user-role.d";

export default function AdminSidebar() {
  const { sidebarCtx } = useAdminContext();
  const { isNavOpen, updateSb } = sidebarCtx;

  const { user: authUser } = useUser();
  const isAdmin = authUser?.publicMetadata.role === ("admin" as UserRole);

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
    <aside
      id="AdminSidebar"
      className={`${css.wrapper} ${isNavOpen && css.navOpen}`}
    >
      <div className={css.logo}>
        <div className={css.logoSymbol}>
          <Logo href="/dashboard" symbol />
        </div>
        <div className={`${css.logoText}`}>
          <Logo
            href="/dashboard"
            className={`${isNavOpen && css.navItemOff}`}
          />
        </div>

        <div className={css.toggleButton}>
          <SidebarToggle
            icon="bi-x-lg"
            title={`${isNavOpen ? "Show menu" : "Hide menu"}`}
            toggleSidebar={updateSb}
          />
        </div>
      </div>

      <div className={css.search}>
        <TextField
          id="standard-basic"
          label="Search ..."
          size="small"
          sx={{
            width: "100%",
          }}
        />
      </div>

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
              if (!item.isAdmin) return;
              return getNavItem(item);
            })}
          </div>
        )}
      </nav>

      <div className={css.footer}>
        <ToggleTheme />
      </div>
    </aside>
  );
}
