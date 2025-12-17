"use client";

import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import classNames from "classnames";
import css from "@/styles/layout/admin/AdminSidebar.module.css";
import AdminSidebarFooter from "./sidebar/AdminSidebarFooter";
import AdminSidebarHeader from "./sidebar/AdminSidebarHeader";
import AdminSidebarNav from "./sidebar/AdminSidebarNav";
import { UserRole } from "@/types/users/user-role.d";
import { GetUserInfo } from "@/types/users/get-user-info.d";
import { memo } from "react";

interface AdminSidebarProps {
  role: UserRole;
  userInfo: GetUserInfo;
}

function AdminSidebar({ role, userInfo }: AdminSidebarProps) {
  const { sidebarCtx } = useAdminUi();
  const { isNavOpen } = sidebarCtx;

  const style = isNavOpen ? css.navOpen : "";
  const wrapperCss = classNames(css.wrapper, style);

  return (
    <aside id="AdminSidebar" className={wrapperCss}>
      <AdminSidebarHeader isNavOpen={isNavOpen} />
      <AdminSidebarNav isNavOpen={isNavOpen} role={role} />
      <AdminSidebarFooter role={role} userInfo={userInfo} />
    </aside>
  );
}

export default memo(AdminSidebar);
