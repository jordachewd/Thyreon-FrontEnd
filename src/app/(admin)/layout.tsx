import AdminMain from "@/components/layout/admin/AdminMain";
import AdminSidebar from "@/components/layout/admin/AdminSidebar";
import AdminUiProvider from "@/components/layout/providers/AdminUiProvider";
import ClientApolloProvider from "@/components/layout/providers/ClientApolloProvider";
import AdminWrapper from "@/components/layout/wrappers/AdminWrapper";
import getCurrentUser from "@/lib/actions/users/get-current-user";
import getUserData from "@/lib/actions/users/get-user-data";
import { UserRole } from "@/types/users/user-role.d";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  const role: UserRole = user.success ? user.user.role : "lite";
  const userData = await getUserData();

  return (
    <ClientApolloProvider>
      <AdminUiProvider>
        <AdminWrapper role={role}>
          <AdminSidebar role={role} userInfo={userData.userInfo} />
          <AdminMain>{children}</AdminMain>
        </AdminWrapper>
      </AdminUiProvider>
    </ClientApolloProvider>
  );
}
