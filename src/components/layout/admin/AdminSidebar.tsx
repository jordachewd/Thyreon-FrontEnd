import getCurrentUser from "@/lib/actions/users/get-me-user";
import AdminSidebarWrapper from "./sidebar/AdminSidebarWrapper";
import { UserRole } from "@/types/users/user-role.d";
import { GetUserData } from "@/types/users/get-user-data.d";

export default async function AdminSidebar() {
  const profile = await getCurrentUser<GetUserData>();
  const isAdmin = profile?.role === ("admin" as UserRole);

  return <AdminSidebarWrapper isAdmin={isAdmin} />;
}
