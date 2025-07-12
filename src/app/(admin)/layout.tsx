import AdminSidebar from "@/components/layout/admin/AdminSidebar";
import AdminContent from "@/components/layout/admin/AdminContent";
import AdminWrapper from "@/components/layout/admin/AdminWrapper";
import { AdminContextProvider } from "@/context/admin/AdminContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminContextProvider>
      <AdminWrapper>
        <AdminSidebar />
        <AdminContent>{children}</AdminContent>
      </AdminWrapper>
    </AdminContextProvider>
  );
}
