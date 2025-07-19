"use client";

import { useAdminContext } from "@/context/admin/AdminContext";
import css from "@/styles/layout/admin/AdminSidebar.module.css";
import AdminSidebarFooter from "./sidebar/AdminSidebarFooter";
import AdminSidebarHeader from "./sidebar/AdminSidebarHeader";
import AdminSidebarNav from "./sidebar/AdminSidebarNav";
import AdminSidebarSearch from "./sidebar/AdminSidebarSearch";
import LoadingBubbles from "@/components/shared/LoadingBubbles";

export default function AdminSidebar() {
  const { sidebarCtx, meCtx } = useAdminContext();
  const { isNavOpen, updateSb } = sidebarCtx;
  const { data, loading, error } = meCtx;

  if (loading)
    return (
      <aside
        id="AdminSidebar"
        className={`${css.wrapper} ${isNavOpen && css.navOpen}`}
      >
        <LoadingBubbles wrapped />
      </aside>
    );

  if (error)
    return (
      <aside
        id="AdminSidebar"
        className={`${css.wrapper} ${isNavOpen && css.navOpen}`}
      >
        <p className="flex p-4 text-red-600">Error: {error.message}</p>
      </aside>
    );

  const isAdmin = data?.me?.role === "admin";

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
