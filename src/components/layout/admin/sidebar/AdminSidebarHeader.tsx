"use client";

import { memo } from "react";
import Logo from "@/components/shared/Logo";
import SidebarToggle from "@/components/sections/admin/SidebarToggle";
import css from "@/styles/layout/admin/AdminSidebar.module.css";

interface AdminSidebarHeaderProps {
  isNavOpen: boolean;
  updateSb: () => void;
}

const AdminSidebarHeader = memo(
  ({ isNavOpen, updateSb }: AdminSidebarHeaderProps) => {
    return (
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
    );
  }
);

AdminSidebarHeader.displayName = "AdminSidebarHeader";
export default AdminSidebarHeader;
