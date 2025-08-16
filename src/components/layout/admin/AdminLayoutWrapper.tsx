import { AdminContextProvider } from "@/context/AdminContext";
import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";
import AdminWrapper from "./AdminWrapper";

type AdminLayoutWrapperProps = {
  children: React.ReactNode;
};

export default function AdminLayoutWrapper({
  children,
}: AdminLayoutWrapperProps) {
  return (
    <AdminContextProvider>
      <AdminWrapper>
        <AdminSidebar />
        <AdminMain>{children}</AdminMain>
      </AdminWrapper>
    </AdminContextProvider>
  );
}
