"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface SidebarCtxProps {
  isNavOpen: boolean;
  updateSb: () => void;
}

interface AdminContextType {
  sidebarCtx: SidebarCtxProps;
}

const defaultCtxVals: AdminContextType = {
  sidebarCtx: {
    isNavOpen: false,
    updateSb: () => {},
  },
};

const AdminContext = createContext<AdminContextType>(defaultCtxVals);

interface AdminCtxProviderProps {
  children: ReactNode;
}

export function AdminContextProvider({ children }: AdminCtxProviderProps) {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const context: AdminContextType = {
    sidebarCtx: {
      isNavOpen: openNav,
      updateSb: () => setOpenNav((prevOpenNav) => !prevOpenNav),
    },
  };

  return (
    <AdminContext.Provider value={context}>{children}</AdminContext.Provider>
  );
}

export const useAdminContext = () => useContext(AdminContext);

export default AdminContext;
