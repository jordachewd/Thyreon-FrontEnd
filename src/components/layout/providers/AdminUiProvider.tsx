"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  ReactNode,
} from "react";

type AlertSeverity = "error" | "warning" | "info" | "success";

type AlertMessageParams = {
  text: string;
  severity: AlertSeverity;
};

type AlertCtxParams = {
  message: AlertMessageParams;
  updateAlert: (next: AlertMessageParams) => void;
};

type SidebarCtxParams = {
  isNavOpen: boolean;
  updateSb: () => void;
};

interface AdminUiCtxType {
  sidebarCtx: SidebarCtxParams;
  alertCtx: AlertCtxParams;
}

const sidebarDefaults: SidebarCtxParams = {
  isNavOpen: true,
  updateSb: () => {},
};

const alertDefaults: AlertCtxParams = {
  message: { text: "", severity: "info" },
  updateAlert: () => {},
};

const AdminUiContext = createContext<AdminUiCtxType>({
  sidebarCtx: sidebarDefaults,
  alertCtx: alertDefaults,
});

function AdminUiProvider({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);
  const [message, setMessage] = useState<AlertMessageParams>({
    text: "",
    severity: "info",
  });

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

export default AdminUiProvider;

export function useAdminUi() {
  const ctx = useContext(AdminUiContext);
  if (!ctx) {
    throw new Error("useAdminUi must be used inside <AdminUiProvider>");
  }
  return ctx;
}
