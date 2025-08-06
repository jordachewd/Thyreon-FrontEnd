"use client";
import css from "@/styles/layout/admin/AdminHeader.module.css";
import AdminHeaderMenu from "@/components/layout/admin/header/AdminHeaderMenu";
import SidebarToggle from "@/components/sections/admin/shared/SidebarToggle";
import Logo from "@/components/shared/Logo";
import IconButton from "@mui/material/IconButton";
import { useAdminContext } from "@/context/admin/AdminContext";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { UserButton } from "@clerk/nextjs";
import { memo } from "react";
import Badge from "@mui/material/Badge";

function AdminHeader() {
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
        </div>
        <div className={css.center}>
          <Logo href="/dashboard" fullLogo />
        </div>

        <div className={css.right}>
          <div className={css.utils}>
            <TooltipArrow title="Help" placement="bottom">
              <IconButton
                sx={{ p: 0, backgroundColor: "transparent!important" }}
              >
                <Badge variant="dot" color="success">
                  <i className="bi bi-patch-question text-base"></i>
                </Badge>
              </IconButton>
            </TooltipArrow>

            <TooltipArrow title="Notifications" placement="bottom">
              <IconButton
                sx={{ p: 0, backgroundColor: "transparent!important" }}
              >
                <i className="bi bi-bell text-base"></i>
              </IconButton>
            </TooltipArrow>

            <AdminHeaderMenu />
          </div>
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default memo(AdminHeader);
