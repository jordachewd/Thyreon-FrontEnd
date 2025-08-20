import AdminLayoutWrapper from "@/components/layout/wrappers/AdminLayoutWrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
