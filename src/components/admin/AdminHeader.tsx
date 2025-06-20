"use client";

import css from "@/styles/admin/AdminHeader.module.css";
import ToggleTheme from "@/components/shared/ToggleTheme";
import AvatarMenu from "@/components/shared/AvatarMenu";
import SidebarToggle from "../shared/SidebarToggle";
import { useAdminContext } from "@/context/AdminContext";
import TextField from "@mui/material/TextField";
import Logo from "../shared/Logo";

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
          <div className={css.search}>
            <TextField id="standard-basic" label="Search ..." size="small" />
          </div>
        </div>
        <div className={css.center}>
          <Logo href="/dashboard" fullLogo />
        </div>

        <div className={css.right}>
          <div className={css.theme}>
            <ToggleTheme />
          </div>
          <AvatarMenu />
        </div>
      </div>
    </header>
  );
}
