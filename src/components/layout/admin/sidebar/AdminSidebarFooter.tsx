"use client";
import { memo } from "react";
import ToggleTheme from "@/components/shared/ToggleTheme";
import css from "@/styles/layout/admin/AdminSidebar.module.css";

const AdminSidebarFooter = memo(() => {
  return (
    <div className={css.footer}>
      <ToggleTheme />
    </div>
  );
});

AdminSidebarFooter.displayName = "AdminSidebarFooter";
export default AdminSidebarFooter;
