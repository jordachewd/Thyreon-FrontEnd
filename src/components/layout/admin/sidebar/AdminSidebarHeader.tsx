import Logo from "@/components/shared/Logo";
import SidebarToggle from "@/components/sections/admin/shared/SidebarToggle";
import css from "@/styles/layout/admin/AdminSidebar.module.css";

interface AdminSidebarHeaderProps {
  isNavOpen: boolean;
}

export default function AdminSidebarHeader({
  isNavOpen,
}: AdminSidebarHeaderProps) {
  return (
    <div className={css.logo}>
      <div className={css.logoSymbol}>
        <Logo href="/dashboard" symbol />
      </div>
      <div className={`${css.logoText}`}>
        <Logo href="/dashboard" className={`${isNavOpen && css.navItemOff}`} />
      </div>
      <div className={css.toggleButton}>
        <SidebarToggle icon="bi-x-lg" />
      </div>
    </div>
  );
}
