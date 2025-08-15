"use client";

import SidebarToggle from "@/components/sections/admin/shared/SidebarToggle";
import Logo from "@/components/shared/Logo";
import { useAdminContext } from "@/context/admin/AdminContext";
import { memo } from "react";
import css from "@/styles/layout/admin/AdminHeader.module.css";
import UserButtonMenu from "../common/UserButtonMenu";

function AdminHeader() {
  const { sidebarCtx } = useAdminContext();
  const { isNavOpen, updateSb } = sidebarCtx;

  const toggleTitle = isNavOpen ? "Show menu" : "Hide menu";

  return (
    <header id="AdminHeader" className={css.section}>
      <div className={css.content}>
        <div className={css.left}>
          <SidebarToggle
            icon="bi-layout-sidebar"
            title={toggleTitle}
            toggleSidebar={updateSb}
          />
        </div>

        <div className={css.center}>
          <Logo href="/dashboard" fullLogo />
        </div>

        <div className={css.right}>
          <UserButtonMenu showName />
        </div>
      </div>
    </header>
  );
}

export default memo(AdminHeader);
