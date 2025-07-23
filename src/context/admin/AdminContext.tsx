"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import { AlertMessageParams } from "@/context/admin/types/alert/alert-msg-params.interface";
import { AlertCtxParams } from "./types/alert/alert-ctx-params.interface";
import { SidebarCtxParams } from "./types/sidebar/sidebar-ctx-params.interface";
import { MeCtxParams } from "./types/get-me/me-ctx-params.interface";
import { meDefaults as meState } from "./constants/me-defaults.const";
import { sidebarDefaults as sbState } from "./constants/sidebar-defaults.const";
import { alertDefaults as atState } from "./constants/alert-defaults.const";
import { useQuery } from "@apollo/client";
import { GetUserData } from "@/types/users/get-user-data.d";
import { GET_ME_QUERY } from "@/constants/graphql/users/get-me.const";

interface AdminCtxProviderProps {
  children: ReactNode;
}

interface AdminCtxType {
  meCtx: MeCtxParams;
  sidebarCtx: SidebarCtxParams;
  alertCtx: AlertCtxParams;
}

const defaultCtxVals: AdminCtxType = {
  meCtx: meState,
  sidebarCtx: sbState,
  alertCtx: atState,
};

const AdminContext = createContext<AdminCtxType>(defaultCtxVals);

export function AdminContextProvider({ children }: AdminCtxProviderProps) {
  const [openNav, setOpenNav] = useState<boolean>(sbState.isNavOpen);
  const [alertMsg, setAlertMsg] = useState<AlertMessageParams>(atState.message);

  const { data, loading, error } = useQuery<{ me: GetUserData }>(GET_ME_QUERY);
  const profileData = { me: data?.me as GetUserData | undefined };

  const context: AdminCtxType = {
    meCtx: {
      data: profileData,
      loading,
      error,
    },
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
