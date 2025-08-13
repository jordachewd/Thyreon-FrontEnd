import AdminFrame from "@/components/layout/admin/AdminFrame";
import { adminNavItems } from "@/constants/layout/admin-nav.const";

type AdminLayoutProps = {
  children: React.ReactNode;
  users: React.ReactNode;
  sites: React.ReactNode;
  transactions: React.ReactNode;
  settings: React.ReactNode;
};

export default function AdminLayout(props: AdminLayoutProps) {
  const { children, ...slots } = props;
  return <AdminFrame tabs={adminNavItems} slots={slots} overview={children} />;
}
