import Logo from "@/components/shared/Logo";
import SidebarToggle from "@/components/sections/admin/shared/SidebarToggle";

interface AdminSidebarHeaderProps {
  isNavOpen: boolean;
}

export default function AdminSidebarHeader({
  isNavOpen,
}: AdminSidebarHeaderProps) {
  return (
    <div className="admin-sidebar-logo">
      <div className="admin-sidebar-logo-symbol">
        <Logo href="/dashboard" symbol />
      </div>
      <div className="admin-sidebar-logo-text">
        <Logo href="/dashboard" className={`${isNavOpen && "admin-sidebar-nav-item-off"}`} />
      </div>
      <div className="admin-sidebar-toggle-button">
        <SidebarToggle icon="bi-x-lg" />
      </div>
    </div>
  );
}
