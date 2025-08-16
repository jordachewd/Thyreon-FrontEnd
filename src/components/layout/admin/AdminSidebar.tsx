"use client";

import { useAdminContext } from "@/context/AdminContext";
import classNames from "classnames";
import css from "@/styles/layout/admin/AdminSidebar.module.css";
import AdminSidebarFooter from "./sidebar/AdminSidebarFooter";
import AdminSidebarHeader from "./sidebar/AdminSidebarHeader";
import AdminSidebarNav from "./sidebar/AdminSidebarNav";

export default function AdminSidebar() {
  const { sidebarCtx } = useAdminContext();
  const { isNavOpen, updateSb } = sidebarCtx;

  const style = isNavOpen ? css.navOpen : "";
  const wrapperCss = classNames(css.wrapper, style);

  return (
    <aside id="AdminSidebar" className={wrapperCss}>
      <AdminSidebarHeader isNavOpen={isNavOpen} updateSb={updateSb} />
      <AdminSidebarNav isNavOpen={isNavOpen} />
      <AdminSidebarFooter />
    </aside>
  );
}
