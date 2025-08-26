import css from "@/styles/layout/admin/AdminSidebar.module.css";
import Promo from "@/components/shared/promo/Promo";
import { memo } from "react";

function AdminSidebarFooter() {
  return (
    <div className={css.footer}>
      <Promo />
    </div>
  );
}

export default memo(AdminSidebarFooter);
