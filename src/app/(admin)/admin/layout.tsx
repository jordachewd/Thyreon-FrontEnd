import AdminFrame from "@/components/layout/admin/AdminFrame";
import { adminNavItems } from "@/constants/layout/admin-nav.const";
import { ReactNode } from "react";

export default function AdminSectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminFrame tabs={adminNavItems}>{children}</AdminFrame>;
}
