import SidebarToggle from "@/components/sections/admin/shared/SidebarToggle";
import Logo from "@/components/shared/Logo";
import UserButtonMenu from "../common/UserButtonMenu";

export default function AdminHeader() {
  return (
    <header id="AdminHeader" className="admin-header-section">
      <div className="admin-header-content">
        <div className="admin-header-left">
          <SidebarToggle icon="bi-layout-sidebar" />
        </div>

        <div className="admin-header-center">
          <Logo href="/dashboard" fullLogo />
        </div>

        <div className="admin-header-right">
          <UserButtonMenu showName />
        </div>
      </div>
    </header>
  );
}
