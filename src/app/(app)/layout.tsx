import AdminMain from "@/components/layout/admin/AdminMain";
import AdminSidebar from "@/components/layout/admin/AdminSidebar";
import AdminProvider from "@/components/layout/providers/AdminProvider";
import AdminWrapper from "@/components/layout/wrappers/AdminWrapper"; 
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <AdminWrapper>
        <AdminSidebar />
        <AdminMain>{children}</AdminMain>
      </AdminWrapper>
    </AdminProvider>
  );
}
