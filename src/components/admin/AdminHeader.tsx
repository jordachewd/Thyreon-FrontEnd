"use client";

import css from "@/styles/admin/AdminHeader.module.css";
import ToggleTheme from "@/components/shared/ToggleTheme";
import AvatarMenu from "@/components/shared/AvatarMenu";
import SidebarToggle from "../shared/SidebarToggle";
import { useAdminContext } from "@/context/AdminContext";

export default function AdminHeader() {
  const { sidebarCtx } = useAdminContext();
  const { isNavOpen, updateSb } = sidebarCtx;

  return (
    <header id="AdminHeader" className={`${css.section}  `}>
      <div className={css.content}>
        <div className={css.left}>
          <SidebarToggle
            icon="bi-layout-sidebar"
            title={`${isNavOpen ? "Show menu" : "Hide menu"}`}
            toggleSidebar={updateSb}
          />
          <div>Search ...</div>
        </div>
        <div className={css.right}>
          <ToggleTheme />
          <AvatarMenu />
        </div>
      </div>
    </header>
  );
}
