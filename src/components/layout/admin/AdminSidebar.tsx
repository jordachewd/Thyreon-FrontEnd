"use client";

import { useAdminContext } from "@/context/admin/AdminContext";
import css from "@/styles/layout/admin/AdminSidebar.module.css";
import AdminSidebarFooter from "./sidebar/AdminSidebarFooter";
import AdminSidebarHeader from "./sidebar/AdminSidebarHeader";
import AdminSidebarNav from "./sidebar/AdminSidebarNav";
import AdminSidebarSearch from "./sidebar/AdminSidebarSearch";

export default function AdminSidebar() {
  const { sidebarCtx } = useAdminContext();
  const { isNavOpen, updateSb } = sidebarCtx;
  return (
    <aside
      id="AdminSidebar"
      className={`${css.wrapper} ${isNavOpen && css.navOpen}`}
    >
      <AdminSidebarHeader isNavOpen={isNavOpen} updateSb={updateSb} />
      <AdminSidebarSearch />
      <AdminSidebarNav isNavOpen={isNavOpen} />
      <AdminSidebarFooter />
    </aside>
  );
}
