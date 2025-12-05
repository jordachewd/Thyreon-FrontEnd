import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { AdminUiProvider } from "@/context/AdminUiContext";
import { ReactNode } from "react";

export default function AdminProvider({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminUiProvider>{children}</AdminUiProvider>
    </AdminAuthProvider>
  );
}
