import css from "@/styles/layout/admin/AdminSidebar.module.css";
import Promo from "@/components/shared/promo/Promo";
import { UserRole } from "@/types/users/user-role.d";
import { GetUserInfo } from "@/types/users/get-user-info.d";

interface AdminSidebarFooterProps {
  role: UserRole;
  userInfo: GetUserInfo;
}

export default function AdminSidebarFooter({ role, userInfo }: AdminSidebarFooterProps) {
  return (
    <div className={css.footer}>
      <Promo role={role} userInfo={userInfo} />
    </div>
  );
}
