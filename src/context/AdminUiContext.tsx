"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { alertDefaults } from "./constants/alert-defaults.const";
import { sidebarDefaults } from "./constants/sidebar-defaults.const";
import type { AlertCtxParams } from "./types/alert-ctx-params.d";
import type { AlertMessageParams } from "./types/alert-msg-params.d";
import type { SidebarCtxParams } from "./types/sidebar-ctx-params.d";

interface AdminUiCtxType {
  sidebarCtx: SidebarCtxParams;
  alertCtx: AlertCtxParams;
}

const AdminUiContext = createContext<AdminUiCtxType>({
  sidebarCtx: sidebarDefaults,
  alertCtx: alertDefaults,
});

export function AdminUiProvider({ children }: { children: React.ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(
    sidebarDefaults.isNavOpen
  );
  const [message, setMessage] = useState<AlertMessageParams>(
    alertDefaults.message
  );

  const updateSb = useCallback(() => setIsNavOpen((open) => !open), []);
  const updateAlert = useCallback(
    (next: AlertMessageParams) =>
      setMessage({ text: next.text, severity: next.severity }),
    []
  );

  const value = useMemo<AdminUiCtxType>(
    () => ({
      sidebarCtx: { isNavOpen, updateSb },
      alertCtx: { message, updateAlert },
    }),
    [isNavOpen, message, updateSb, updateAlert]
  );

  return (
    <AdminUiContext.Provider value={value}>{children}</AdminUiContext.Provider>
  );
}

export function useAdminUi() {
  return useContext(AdminUiContext);
}
