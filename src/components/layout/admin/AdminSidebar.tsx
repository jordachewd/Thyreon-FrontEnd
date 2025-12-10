"use client";

import { useAdminUi } from "@/context/AdminUiContext";
import classNames from "classnames";
import css from "@/styles/layout/admin/AdminSidebar.module.css";
import AdminSidebarFooter from "./sidebar/AdminSidebarFooter";
import AdminSidebarHeader from "./sidebar/AdminSidebarHeader";
import AdminSidebarNav from "./sidebar/AdminSidebarNav";
import { memo } from "react";

function AdminSidebar() {
  const { sidebarCtx } = useAdminUi();
  const { isNavOpen } = sidebarCtx;

  const style = isNavOpen ? css.navOpen : "";
  const wrapperCss = classNames(css.wrapper, style);

  return (
    <aside id="AdminSidebar" className={wrapperCss}>
      <AdminSidebarHeader isNavOpen={isNavOpen} />
      <AdminSidebarNav isNavOpen={isNavOpen} />
      <AdminSidebarFooter />
    </aside>
  );
}

export default memo(AdminSidebar);
