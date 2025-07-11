"use client";

import css from "@/styles/layout/admin/AdminSidebar.module.css";
import { useAdminContext } from "@/context/AdminContext";
import AdminSidebarHeader from "./AdminSidebarHeader";
import AdminSidebarSearch from "./AdminSidebarSearch";
import AdminSidebarNav from "./AdminSidebarNav";
import AdminSidebarFooter from "./AdminSidebarFooter";

interface AdminSidebarWrapperProps {
  isAdmin?: boolean; // Optional prop to indicate if the user
}

export default function AdminSidebarWrapper({
  isAdmin = false,
}: AdminSidebarWrapperProps) {
  const { sidebarCtx } = useAdminContext();
  const { isNavOpen, updateSb } = sidebarCtx;

  return (
    <aside
      id="AdminSidebar"
      className={`${css.wrapper} ${isNavOpen && css.navOpen}`}
    >
      <AdminSidebarHeader isNavOpen={isNavOpen} updateSb={updateSb} />

      <AdminSidebarSearch />

      <AdminSidebarNav isNavOpen={isNavOpen} isAdmin={isAdmin} />

      <AdminSidebarFooter />
    </aside>
  );
}
