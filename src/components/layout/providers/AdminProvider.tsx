"use client";

import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { AdminUiProvider } from "@/context/AdminUiContext";

type AdminProviderProps = {
  children: React.ReactNode;
};

export default function AdminProvider({ children }: AdminProviderProps) {
  return (
    <AdminAuthProvider>
      <AdminUiProvider>{children}</AdminUiProvider>
    </AdminAuthProvider>
  );
}
