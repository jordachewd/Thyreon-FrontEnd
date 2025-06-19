import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminContent from "@/components/admin/AdminContent";
import AdminWrapper from "@/components/admin/AdminWrapper";
import { AdminContextProvider } from "@/context/AdminContext";

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
