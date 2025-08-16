"use client";

import { ReactNode, useState, useContext, createContext } from "react";
import { alertDefaults } from "./constants/alert-defaults.const";
import { sidebarDefaults } from "./constants/sidebar-defaults.const";
import { AlertCtxParams } from "./types/alert-ctx-params.d";
import { AlertMessageParams } from "./types/alert-msg-params.d";
import { SidebarCtxParams } from "./types/sidebar-ctx-params.d";

interface AdminCtxProviderProps {
  children: ReactNode;
}

interface AdminCtxType {
  sidebarCtx: SidebarCtxParams;
  alertCtx: AlertCtxParams;
}

const defaultCtxVals: AdminCtxType = {
  sidebarCtx: sidebarDefaults,
  alertCtx: alertDefaults,
};

const AdminContext = createContext<AdminCtxType>(defaultCtxVals);

export function AdminContextProvider({ children }: AdminCtxProviderProps) {
  const [openNav, setOpenNav] = useState<boolean>(sidebarDefaults.isNavOpen);
  const [alertMsg, setAlertMsg] = useState<AlertMessageParams>(
    alertDefaults.message
  );

  const context: AdminCtxType = {
    sidebarCtx: {
      isNavOpen: openNav,
      updateSb: () => setOpenNav((prevOpenNav) => !prevOpenNav),
    },
    alertCtx: {
      message: alertMsg,
      updateAlert: (newAlert) =>
        setAlertMsg({
          text: newAlert.text,
          severity: newAlert.severity,
        }),
    },
  };

  return (
    <AdminContext.Provider value={context}>{children}</AdminContext.Provider>
  );
}

export const useAdminContext = () => useContext(AdminContext);
