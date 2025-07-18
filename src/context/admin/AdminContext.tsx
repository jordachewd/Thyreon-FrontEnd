"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import { AlertMessageParams } from "@/context/admin/types/alert/alert-msg-params.interface";
import { AlertCtxParams } from "./types/alert/alert-ctx-params.interface";
import { SidebarCtxParams } from "./types/sidebar/sidebar-ctx-params.interface";
import { sidebarDefaults as sbState } from "./constants/sidebar-defaults.const";
import { alertDefaults as atState } from "./constants/alert-defaults.const";

interface AdminCtxType {
  sidebarCtx: SidebarCtxParams;
  alertCtx: AlertCtxParams;
}

interface AdminCtxProviderProps {
  children: ReactNode;
}

const defaultCtxVals: AdminCtxType = {
  sidebarCtx: sbState,
  alertCtx: atState,
};

const AdminContext = createContext<AdminCtxType>(defaultCtxVals);

export function AdminContextProvider({ children }: AdminCtxProviderProps) {
  const [openNav, setOpenNav] = useState<boolean>(sbState.isNavOpen);
  const [alertMsg, setAlertMsg] = useState<AlertMessageParams>(atState.message);

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
          variant: newAlert.variant,
        }),
    },
  };

  return (
    <AdminContext.Provider value={context}>{children}</AdminContext.Provider>
  );
}

export const useAdminContext = () => useContext(AdminContext);
