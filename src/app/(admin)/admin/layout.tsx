import AdminFrame from "@/components/layout/admin/AdminFrame";
import { adminNavItems } from "@/constants/layout/admin-nav.const";
import { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
  transactions: ReactNode;
};

export default function AdminSectionLayout(props: AdminLayoutProps) {
  const { children, ...slots } = props;
  return <AdminFrame tabs={adminNavItems} slots={slots} overview={children} />;
}
