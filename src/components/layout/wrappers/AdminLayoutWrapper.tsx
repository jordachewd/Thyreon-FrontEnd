import AdminMain from "../admin/AdminMain";
import AdminSidebar from "../admin/AdminSidebar";
import AdminProvider from "../providers/AdminProvider";
import AdminWrapper from "./AdminWrapper";

type AdminLytWrpProps = {
  children: React.ReactNode;
};

export default function AdminLayoutWrapper({ children }: AdminLytWrpProps) {
  return (
    <AdminProvider>
      <AdminWrapper>
        <AdminSidebar />
        <AdminMain>{children}</AdminMain>
      </AdminWrapper>
    </AdminProvider>
  );
}
