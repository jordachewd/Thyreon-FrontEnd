import SidebarToggle from "@/components/sections/admin/shared/SidebarToggle";
import Logo from "@/components/shared/Logo";
import UserButtonMenu from "../common/UserButtonMenu";
import css from "@/styles/layout/admin/AdminHeader.module.css";

export default function AdminHeader() {
  return (
    <header id="AdminHeader" className={css.section}>
      <div className={css.content}>
        <div className={css.left}>
          <SidebarToggle icon="bi-layout-sidebar" />
        </div>

        <div className={css.center}>
          <Logo href="/dashboard" fullLogo />
        </div>

        <div className={css.right}>
          <UserButtonMenu showName />
        </div>
      </div>
    </header>
  );
}
