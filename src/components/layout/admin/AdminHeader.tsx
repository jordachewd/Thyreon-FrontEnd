"use client";
import css from "@/styles/layout/admin/AdminHeader.module.css";
import AdminHeaderNav from "@/components/layout/admin/header/AdminHeaderNav";
import SidebarToggle from "@/components/sections/admin/SidebarToggle";
import { useAdminContext } from "@/context/admin/AdminContext";
// import TextField from "@mui/material/TextField";
import Logo from "@/components/shared/Logo";
import IconButton from "@mui/material/IconButton";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { UserButton } from "@clerk/nextjs";
import { memo } from "react";

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
          {/*           
          <div className={css.search}>
            <TextField id="standard-basic" label="Search ..." size="small" />
          </div> 
          */}
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
                <i className="bi bi-patch-question text-base"></i>
              </IconButton>
            </TooltipArrow>

            <TooltipArrow title="Notifications" placement="bottom">
              <IconButton
                sx={{ p: 0, backgroundColor: "transparent!important" }}
              >
                <i className="bi bi-bell text-base"></i>
              </IconButton>
            </TooltipArrow>

            <AdminHeaderNav />
          </div>
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default memo(AdminHeader);
