"use client";

import { useAdminContext } from "@/context/admin/AdminContext";
import css from "@/styles/layout/admin/AdminSidebar.module.css";
import AdminSidebarFooter from "./sidebar/AdminSidebarFooter";
import AdminSidebarHeader from "./sidebar/AdminSidebarHeader";
import AdminSidebarNav from "./sidebar/AdminSidebarNav";
import AdminSidebarSearch from "./sidebar/AdminSidebarSearch";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ErrorCard from "@/components/shared/ErrorCard";

export default function AdminSidebar() {
  const { sidebarCtx, meCtx } = useAdminContext();
  const { isNavOpen, updateSb } = sidebarCtx;
  const { data, loading, error } = meCtx;
  const isAdmin = data?.me?.role === "admin";

  return (
    <aside
      id="AdminSidebar"
      className={`${css.wrapper} ${isNavOpen && css.navOpen}`}
    >
      <AdminSidebarHeader isNavOpen={isNavOpen} updateSb={updateSb} />

      {error && typeof error === "object" && "message" in error && (
        <ErrorCard mini error={(error as { message: string }).message} />
      )}

      {!loading && !error ? (
        <>
          <AdminSidebarSearch />
          <AdminSidebarNav isNavOpen={isNavOpen} isAdmin={isAdmin} />
        </>
      ) : (
        <LoadingBubbles wrapped />
      )}

      <AdminSidebarFooter />
    </aside>
  );
}
