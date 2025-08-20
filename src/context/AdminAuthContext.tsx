"use client";

import { useUserRole } from "@/lib/hooks/users/single/useUserRole";
import { createContext, useContext, useMemo } from "react";

type AdminAuthValue = ReturnType<typeof useUserRole>;
const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const userRole = useUserRole();

  const value = useMemo(
    () => userRole,
    [
      userRole.role,
      userRole.loading,
      userRole.error,
      userRole.isLite,
      userRole.isPro,
      userRole.isPremium,
      userRole.isAdmin,
    ]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx)
    throw new Error("useAdminAuth must be used inside <AdminAuthProvider>");
  return ctx;
}
