import css from "@/styles/layout/admin/AdminSidebar.module.css";
import Promo from "@/components/shared/promo/Promo";

export default function AdminSidebarFooter() {
  return (
    <div className={css.footer}>
      <Promo />
    </div>
  );
}
