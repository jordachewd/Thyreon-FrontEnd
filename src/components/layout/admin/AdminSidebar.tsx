import getCurrentUser from "@/lib/actions/users/get-current-user";
import AdminSidebarWrapper from "./sidebar/AdminSidebarWrapper";
import { UserRole } from "@/types/users/user-role.d";

export default async function AdminSidebar() {
  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.role === ("admin" as UserRole);

  return <AdminSidebarWrapper isAdmin={isAdmin} />;
}
