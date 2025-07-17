import { memo } from "react";
import ToggleTheme from "@/components/shared/ToggleTheme";
import css from "@/styles/layout/admin/AdminSidebar.module.css";

function AdminSidebarFooter() {
  return (
    <div className={css.footer}>
      <ToggleTheme />
    </div>
  );
}

export default memo(AdminSidebarFooter);
