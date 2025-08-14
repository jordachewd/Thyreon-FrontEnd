import AdminLayoutWrapper from "@/components/layout/admin/AdminLayoutWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
